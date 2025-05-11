import { welcomeStep } from "@/lib/mutations";
import { welcomeStepSchema } from "@/lib/schemas";
import { createTRPCRouter, protectedProcedure } from "../init";

export const onboardingRouter = createTRPCRouter({
  welcome: protectedProcedure
    .input(welcomeStepSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { preferredName, profilePicURL } = input;

      await welcomeStep(db, preferredName, profilePicURL, session.user.id);
    }),
});
