import { cookies } from 'next/headers';

import {
  preferencesStep,
  welcomeStep,
  workspaceSetupStep,
} from '@/lib/mutations';
import {
  preferencesStepSchema,
  welcomeStepSchema,
  workspaceSetupStepSchema,
} from '@/lib/schemas';
import { authenticatedProcedure, createTRPCRouter } from '../init';

export const onboardingRouter = createTRPCRouter({
  welcome: authenticatedProcedure
    .input(welcomeStepSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { preferredName, profilePicURL } = input;

      await welcomeStep(db, preferredName, profilePicURL, session.user.id);
    }),

  workspaceSetup: authenticatedProcedure
    .input(workspaceSetupStepSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { workspaceName, workspaceSlug, workspaceLogoURL } = input;

      const workspace = await workspaceSetupStep(
        db,
        workspaceName,
        workspaceSlug,
        workspaceLogoURL,
        session.user.id
      );

      const cookieStore = await cookies();
      cookieStore.set({
        name: 'workspaceId',
        value: workspace.id,
        secure: true,
        httpOnly: true,
      });
    }),

  preferences: authenticatedProcedure
    .input(preferencesStepSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { emailNotifications, pushNotifications, timezone } = input;

      await preferencesStep(
        db,
        emailNotifications,
        pushNotifications,
        timezone,
        session.user.id
      );

      return {
        workspaceSlug: session.user.defaultWorkspace,
      };
    }),
});
