import { TRPCError } from '@trpc/server';
import z from 'zod/v4';
import { getWorkspaceMembersQuery, getWorkspaceQuery } from '@/lib/queries';
import { workspaceSetupSchema } from '@/lib/schemas/setup';
import {
  authenticatedProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '../init';

export const workspaceRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx: { workspaceId } }) => {
    const workspace = await getWorkspaceQuery(workspaceId);
    return workspace;
  }),
  members: protectedProcedure.query(async ({ ctx: { workspaceId } }) => {
    const members = await getWorkspaceMembersQuery(workspaceId);
    return members;
  }),

  workspaceSetup: authenticatedProcedure.input(workspaceSetupSchema).mutation(
    async ({
      input,
      ctx: {
        session: { user },
        db,
      },
    }) => {
      const { workspaceName, workspaceURL } = input;

      const existingWorkspace = await db.workspace.findUnique({
        where: { slug: workspaceURL },
      });

      if (existingWorkspace) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'A workspace with this URL already exists.',
        });
      }

      const result = await db.$transaction(async (tx) => {
        const workspace = await tx.workspace.create({
          data: {
            name: workspaceName,
            slug: workspaceURL,
            createdBy: user.id,
          },
        });

        await tx.workspaceMember.create({
          data: {
            workspaceId: workspace.id,
            userId: user.id,
            role: 'ADMIN',
          },
        });

        await tx.user.update({
          where: { id: user.id },
          data: { defaultWorkspace: workspace.slug },
        });

        return workspace;
      });

      return result;
    }
  ),

  delete: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .mutation(async ({ input: { workspaceId }, ctx: { db, session } }) => {
      const workspace = await db.workspace.findUnique({
        where: { id: workspaceId },
        include: {
          WorkspaceMember: {
            where: { userId: session.user.id },
            select: { role: true },
          },
          _count: {
            select: {
              WorkspaceMember: true,
              Space: true,
              Post: true,
            },
          },
        },
      });

      if (!workspace) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Workspace not found.',
        });
      }

      // Check if the user is an admin of this workspace
      const userMembership = workspace.WorkspaceMember[0];
      if (!userMembership || userMembership.role !== 'ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only workspace admins can delete the workspace.',
        });
      }

      if (workspace.createdBy !== session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only the workspace creator can delete the workspace.',
        });
      }

      const result = await db.$transaction(async (tx) => {
        // Delete all related data in the correct order to avoid foreign key violations

        // 1. Delete all timeline events related to posts in this workspace
        await tx.timelineEvent.deleteMany({
          where: {
            post: {
              workspaceId,
            },
          },
        });

        // 2. Delete all comments on posts in this workspace
        // We need to handle nested comments carefully due to the onDelete: Restrict constraint
        // First, get all posts in this workspace to work with their comments
        const postsInWorkspace = await tx.post.findMany({
          where: { workspaceId },
          select: { id: true },
        });

        const postIds = postsInWorkspace.map((post) => post.id);

        if (postIds.length > 0) {
          // Use a recursive approach to delete comments from deepest level up
          const deleteCommentsRecursively = async (): Promise<void> => {
            const deletedCount = await tx.comment.deleteMany({
              where: {
                postId: { in: postIds },
                replies: { none: {} },
              },
            });

            // If we deleted any comments, there might be more parent comments we can now delete
            if (deletedCount.count > 0) {
              await deleteCommentsRecursively();
            }
          };

          await deleteCommentsRecursively();
        }

        // 3. Delete all favorites for posts and spaces in this workspace
        await tx.favorite.deleteMany({
          where: {
            OR: [
              {
                post: {
                  workspaceId,
                },
              },
              {
                space: {
                  workspaceId,
                },
              },
            ],
          },
        });

        // 4. Delete all posts in this workspace
        await tx.post.deleteMany({
          where: { workspaceId },
        });

        // 5. Delete all space members from spaces in this workspace
        await tx.spaceMember.deleteMany({
          where: {
            space: {
              workspaceId,
            },
          },
        });

        // 6. Delete all spaces in this workspace
        await tx.space.deleteMany({
          where: { workspaceId },
        });

        // 7. Delete all notifications related to this workspace
        await tx.notification.deleteMany({
          where: { workspaceId },
        });

        // 8. Delete all invite tokens for this workspace
        await tx.inviteToken.deleteMany({
          where: { workspaceId },
        });

        // 9. Get all users who had this workspace as their default
        const usersWithDefaultWorkspace = await tx.user.findMany({
          where: { defaultWorkspace: workspace.slug },
          select: { id: true },
        });

        // 10. Delete all workspace members
        await tx.workspaceMember.deleteMany({
          where: { workspaceId },
        });

        // 11. Finally, delete the workspace itself
        await tx.workspace.delete({
          where: { id: workspaceId },
        });

        // 12. Handle users who had this workspace as their default
        // Set their defaultWorkspace to null so they'll be redirected to workspace setup
        if (usersWithDefaultWorkspace.length > 0) {
          await tx.user.updateMany({
            where: {
              id: {
                in: usersWithDefaultWorkspace.map((user) => user.id),
              },
            },
            data: { defaultWorkspace: null },
          });
        }

        return {
          deletedWorkspace: workspace.name,
          affectedUsers: usersWithDefaultWorkspace.length,
          deletedSpaces: workspace._count.Space,
          deletedPosts: workspace._count.Post,
          removedMembers: workspace._count.WorkspaceMember,
        };
      });

      return {
        success: true,
        message: 'Workspace deleted successfully.',
        details: result,
      };
    }),
});
