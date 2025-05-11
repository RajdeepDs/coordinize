import { welcomeStep, workspaceSetupStep } from "@/lib/mutations";
import { welcomeStepSchema, workspaceSetupStepSchema } from "@/lib/schemas";
import { createTRPCRouter, protectedProcedure } from "../init";

export const onboardingRouter = createTRPCRouter({
  welcome: protectedProcedure
    .input(welcomeStepSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { preferredName, profilePicURL } = input;

      await welcomeStep(db, preferredName, profilePicURL, session.user.id);
    }),

  workspaceSetup: protectedProcedure
    .input(workspaceSetupStepSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { workspaceName, workspaceSlug, workspaceLogoURL } = input;

      await workspaceSetupStep(
        db,
        workspaceName,
        workspaceSlug,
        workspaceLogoURL,
        session.user.id,
      );
    }),
});
