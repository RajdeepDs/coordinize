import { OnboardingStep, type PrismaClient } from "@coordinize/database/db";
import { TRPCError } from "@trpc/server";

export async function joinWaitlist(
  db: PrismaClient,
  name: string,
  email: string,
) {
  const existing = await db.earlyAccess.findUnique({ where: { email } });

  if (existing) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Email already exists.",
    });
  }

  await db.earlyAccess.create({
    data: { name, email },
  });
}

export async function welcomeStep(
  db: PrismaClient,
  preferredName: string,
  profilePicURL: string | undefined,
  userId: string,
) {
  await db.user.update({
    where: { id: userId },
    data: {
      name: preferredName,
      image: profilePicURL,
      onboardingStep: OnboardingStep.WORKSPACE_SETUP,
    },
  });
}

export async function workspaceSetupStep(
  db: PrismaClient,
  workspaceName: string,
  workspaceURL: string,
  workspaceLogoURL: string | undefined,
  userId: string,
) {
  const workspace = await db.workspace.create({
    data: {
      name: workspaceName,
      slug: workspaceURL,
      logo: workspaceLogoURL,
      createdBy: userId,
    },
  });

  await db.workspaceMember.create({
    data: {
      workspaceId: workspace.id,
      userId,
      role: "ADMIN",
    },
  });

  await db.user.update({
    where: { id: userId },
    data: {
      defaultWorkspace: workspace.slug,
      onboardingStep: OnboardingStep.PREFERENCES,
    },
  });
}

export async function preferencesStep(
  db: PrismaClient,
  emailNotifications: boolean,
  pushNotifications: boolean,
  timezone: string,
  userId: string,
) {
  await db.notificationPreference.create({
    data: {
      emailNotifications,
      pushNotifications,
      userId: userId,
    },
  });

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      timezone,
      onboarded: true,
    },
  });
}
