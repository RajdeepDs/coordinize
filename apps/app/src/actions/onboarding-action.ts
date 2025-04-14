"use server";

import { Prisma } from "@coordinize/database/db";
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
      try {
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
          tx.user.update({
            where: { id: user.id },
            data: {
              onboarded: true,
            },
          });

          redirect(`/${workspace.slug}`);
        });
      } catch (error) {
        console.error("Onboarding action failed:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new Error("Workspace URL already exists.");
          }
        }

        throw new Error("Failed to complete onboarding process");
      }
    },
  );
