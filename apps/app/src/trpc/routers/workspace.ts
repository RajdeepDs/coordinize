import { getWorkspaceMembersQuery, getWorkspaceQuery } from '@/lib/queries';
import { workspaceSetupSchema } from '@/lib/schemas/setup';
import { createTRPCRouter, protectedProcedure } from '../init';

export const workspaceRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx: { workspaceId } }) => {
    const workspace = await getWorkspaceQuery(workspaceId);
    return workspace;
  }),
  members: protectedProcedure.query(async ({ ctx: { workspaceId } }) => {
    const members = await getWorkspaceMembersQuery(workspaceId);
    return members;
  }),

  workspaceSetup: protectedProcedure.input(workspaceSetupSchema).mutation(
    async ({
      input,
      ctx: {
        session: { user },
        db,
      },
    }) => {
      const { workspaceName, workspaceURL } = input;
      const workspace = await db.workspace.create({
        data: {
          name: workspaceName,
          slug: workspaceURL,
          createdBy: user.id,
        },
      });

      await db.workspaceMember.create({
        data: {
          workspaceId: workspace.id,
          userId: user.id,
          role: 'ADMIN',
        },
      });
    }
  ),
});
