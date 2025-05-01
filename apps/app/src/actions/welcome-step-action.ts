"use server";

import { OnboardingStep } from "@coordinize/database/db";
import { authActionClient } from "./safe-action";
import { welcomeStepSchema } from "./schema";

export const welcomeStepAction = authActionClient
  .metadata({
    name: "welcome-step",
  })
  .schema(welcomeStepSchema)
  .action(
    async ({
      parsedInput: { preferredName, profilePicURL },
      ctx: { user, db },
    }) => {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: preferredName,
          image: profilePicURL,
          onboardingStep: OnboardingStep.WORKSPACE_SETUP,
        },
      });
    },
  );
