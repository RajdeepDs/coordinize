import { z } from 'zod';
import { getUserQuery } from '@/lib/queries';
import {
  authenticatedProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '../init';

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
