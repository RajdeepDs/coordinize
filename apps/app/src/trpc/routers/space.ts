import z, { string } from 'zod/v4';
import { createNewSpace } from '@/lib/mutations';
import { getSpacesQuery, getSpaceWithPublishedPosts } from '@/lib/queries';
import { createSpaceSchema } from '@/lib/schemas';
import { createTRPCRouter, protectedProcedure } from '../init';

const updateSpaceSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .optional(),
  identifier: z
    .string()
    .min(3, { message: 'Identifier must be at least 3 characters.' })
    .optional(),
  about: z.string().optional(),
  icon: z.string().optional(),
});

export const spaceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx: { workspaceId } }) => {
    const spaces = await getSpacesQuery(workspaceId);
    return spaces.map(({ _count, ...space }) => ({
      ...space,
      membersCount: _count.members,
    }));
  }),
  getById: protectedProcedure
    .input(z.object({ id: string() }))
    .query(async ({ input, ctx: { db, workspaceId } }) => {
      const { id } = input;
      const space = await db.space.findFirst({
        where: { identifier: id, workspaceId },
        include: {
          members: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      if (!space) {
        throw new Error('Space not found');
      }

      return space;
    }),
  getSpaceWithPublishedPosts: protectedProcedure
    .input(z.object({ identifier: z.string() }))
    .query(async ({ input, ctx: { workspaceId } }) => {
      const { identifier } = input;
      const space = await getSpaceWithPublishedPosts(identifier, workspaceId);

      return space;
    }),
  getMembersBySpaceId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx: { db, workspaceId } }) => {
      const { id } = input;

      const spaceMembers = await db.spaceMember.findMany({
        where: {
          space: {
            identifier: id,
            workspaceId,
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true,
            },
          },
        },
        orderBy: {
          joined: 'asc',
        },
      });

      return spaceMembers;
    }),
  create: protectedProcedure
    .input(createSpaceSchema)
    .mutation(async ({ input, ctx: { db, session, workspaceId } }) => {
      const { name, identifier, about, icon } = input;

      await createNewSpace(
        db,
        name,
        identifier,
        about,
        icon,
        workspaceId,
        session.user.id
      );

      return {
        workspaceSlug: session.user.defaultWorkspace,
      };
    }),
  update: protectedProcedure
    .input(updateSpaceSchema)
    .mutation(async ({ input, ctx: { db, workspaceId } }) => {
      const { id, name, identifier, about, icon } = input;

      // Build update object dynamically
      const updateData: Record<string, string | null> = {};
      if (name !== undefined) {
        updateData.name = name;
      }
      if (identifier !== undefined) {
        updateData.identifier = identifier;
      }
      if (about !== undefined) {
        updateData.about = about;
      }
      if (icon !== undefined) {
        updateData.icon = icon;
      }

      // Update only if there's something to update
      if (Object.keys(updateData).length > 0) {
        await db.space.update({
          where: {
            id,
            workspaceId, // Ensure the space belongs to the current workspace
          },
          data: updateData,
        });
      }

      return { success: true };
    }),
});
