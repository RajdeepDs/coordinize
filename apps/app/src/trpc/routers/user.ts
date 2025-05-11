import { getUserQuery } from "@/lib/queries";
import { createTRPCRouter, protectedProcedure } from "../init";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    return await getUserQuery(session.user.id);
  }),
});
