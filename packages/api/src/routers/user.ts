import { z } from 'zod';
import {
  authenticatedProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '../init';
import { getUserQuery } from '../queries';

export const userRouter = createTRPCRouter({
  me: authenticatedProcedure.query(async ({ ctx: { session } }) => {
    return await getUserQuery(session.user.id);
  }),
  updateStatusEmoji: protectedProcedure
    .input(
      z.object({
        statusEmoji: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { statusEmoji } = input;

      const user = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          statusEmoji,
        },
      });

      return user;
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        preferredName: z
          .string()
          .min(1, { message: 'Name is required.' })
          .optional(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { preferredName, image } = input;

      // Build update object dynamically
      const updateData: Record<string, string> = {};
      if (preferredName) {
        updateData.name = preferredName;
      }
      if (image !== undefined) {
        updateData.image = image;
      }

      // Update only if there's something to update
      if (Object.keys(updateData).length > 0) {
        await db.user.update({
          where: { id: session.user.id },
          data: updateData,
        });
      }

      return { success: true };
    }),

  updateOnboarding: authenticatedProcedure.mutation(
    async ({ ctx: { db, session } }) => {
      const user = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          onboarded: true,
        },
      });

      return user;
    }
  ),
});
