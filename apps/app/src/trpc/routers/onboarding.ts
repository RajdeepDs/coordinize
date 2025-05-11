import {
  preferencesStep,
  welcomeStep,
  workspaceSetupStep,
} from "@/lib/mutations";
import {
  preferencesStepSchema,
  welcomeStepSchema,
  workspaceSetupStepSchema,
} from "@/lib/schemas";
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

  preferences: protectedProcedure
    .input(preferencesStepSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { emailNotifications, pushNotifications, timezone } = input;

      await preferencesStep(
        db,
        emailNotifications,
        pushNotifications,
        timezone,
        session.user.id,
      );

      return {
        workspaceSlug: session.user.defaultWorkspace,
      };
    }),
});
