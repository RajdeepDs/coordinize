import { getUserQuery } from "@/lib/queries";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    return await getUserQuery(session.user.id);
  }),
  updateStatusEmoji: protectedProcedure
    .input(
      z.object({
        statusEmoji: z.string(),
      }),
    )
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { statusEmoji } = input;

      const user = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          statusEmoji: statusEmoji,
        },
      });

      return user;
    }),
});
