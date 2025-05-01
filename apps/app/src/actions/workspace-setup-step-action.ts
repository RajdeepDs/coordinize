"use server";

import { OnboardingStep } from "@coordinize/database/db";
import { authActionClient } from "./safe-action";
import { workspaceSetupStepSchema } from "./schema";

export const workspaceSetupStepAction = authActionClient
  .metadata({
    name: "workspace-setup-step",
  })
  .schema(workspaceSetupStepSchema)
  .action(
    async ({
      parsedInput: { workspaceName, workspaceURL, workspaceLogoURL },
      ctx: { db, user },
    }) => {
      const workspace = await db.workspace.create({
        data: {
          name: workspaceName,
          slug: workspaceURL,
          logo: workspaceLogoURL,
          createdBy: user.id,
        },
      });

      await db.workspaceMember.create({
        data: {
          workspaceId: workspace.id,
          userId: user.id,
          role: "ADMIN",
        },
      });

      await db.user.update({
        where: { id: user.id },
        data: {
          defaultWorkspace: workspace.slug,
          onboardingStep: OnboardingStep.PREFERENCES,
        },
      });
    },
  );
