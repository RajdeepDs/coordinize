import { database } from '@coordinize/database/db';
import z from 'zod/v4';
import { createTRPCRouter, publicProcedure } from '../init';

export const earlyAccessRouter = createTRPCRouter({
  getWaitlistCount: publicProcedure.query(async () => {
    const count = await database.earlyAccess.count();

    return count;
  }),
  joinWaitlist: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const userAlreadyInWaitlist = await database.earlyAccess.findFirst({
        where: {
          email: input.email,
        },
      });

      if (userAlreadyInWaitlist) {
        return { message: "You're already on the waitlist!" };
      }

      await database.earlyAccess.create({
        data: {
          name: '',
          email: input.email,
        },
      });

      return { message: "You've been added to the waitlist!" };
    }),
});
