import { joinWaitlist } from "@/lib/mutations";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../init";

export const authRouter = createTRPCRouter({
  joinWaitlist: publicProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(3, { message: "Name must be at least 3 characters." }),
        email: z.string().email({ message: "Invalid email address." }),
      }),
    )
    .mutation(async ({ input, ctx: { db } }) => {
      await joinWaitlist(db, input.name, input.email);
    }),
});
