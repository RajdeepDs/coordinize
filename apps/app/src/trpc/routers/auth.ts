import { joinWaitlist } from '@/lib/mutations';
import { joinWaitlistSchema } from '@/lib/schemas';
import { createTRPCRouter, publicProcedure } from '../init';

export const authRouter = createTRPCRouter({
  joinWaitlist: publicProcedure
    .input(joinWaitlistSchema)
    .mutation(async ({ input, ctx: { db } }) => {
      await joinWaitlist(db, input.name, input.email);
    }),
});
