"use server";

import { redirect } from "next/navigation";
import { authActionClient } from "./safe-action";
import { onboardingSchema } from "./schema";

export const onboardingAction = authActionClient
  .metadata({
    name: "onboarding",
  })
  .schema(onboardingSchema)
  .action(
    async ({
      parsedInput: {
        preferredName,
        profilePicURL,
        workspaceName,
        workspaceURL,
        workspaceLogoURL,
        emailNotifications,
        pushNotifications,
        timezone,
      },
      ctx: { user, db },
    }) => {
      await db.$transaction(async (tx) => {
        // Update user profile
        await tx.user.update({
          where: { id: user.id },
          data: {
            name: preferredName,
            image: profilePicURL,
            timezone,
          },
        });

        // Create workspace
        const workspace = await tx.workspace.create({
          data: {
            name: workspaceName,
            slug: workspaceURL,
            logo: workspaceLogoURL,
            createdBy: user.id,
          },
        });

        // Create workspace membership and preferences
        await Promise.all([
          tx.workspaceMember.create({
            data: {
              workspaceId: workspace.id,
              userId: user.id,
              role: "ADMIN",
            },
          }),
          tx.notificationPreference.create({
            data: {
              emailNotifications,
              pushNotifications,
              userId: user.id,
            },
          }),
        ]);

        // Mark user as onboarded
        await tx.user.update({
          where: { id: user.id },
          data: {
            onboarded: true,
          },
        });

        // Redirect after successful onboarding
        redirect(`/${workspaceURL}`);
      });
    },
  );
