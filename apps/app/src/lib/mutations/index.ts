import { OnboardingStep, type PrismaClient } from '@coordinize/database/db';
import { TRPCError } from '@trpc/server';

export async function joinWaitlist(
  db: PrismaClient,
  name: string,
  email: string
) {
  const existing = await db.earlyAccess.findUnique({ where: { email } });

  if (existing) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Email already exists.',
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
  userId: string
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
  userId: string
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
      role: 'ADMIN',
    },
  });

  await db.user.update({
    where: { id: userId },
    data: {
      defaultWorkspace: workspace.slug,
      onboardingStep: OnboardingStep.PREFERENCES,
    },
  });

  return workspace;
}

export async function preferencesStep(
  db: PrismaClient,
  emailNotifications: boolean,
  pushNotifications: boolean,
  timezone: string,
  userId: string
) {
  await db.notificationPreference.create({
    data: {
      emailNotifications,
      pushNotifications,
      userId,
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

export async function createNewSpace(
  db: PrismaClient,
  name: string,
  identifier: string,
  about: string | undefined,
  workspaceId: string,
  userId: string
) {
  const space = await db.space.create({
    data: {
      name,
      identifier,
      about,
      workspaceId,
      createdBy: userId,
    },
  });

  await db.spaceMember.create({
    data: {
      spaceId: space.id,
      userId,
      role: 'ADMIN',
    },
  });
}

export async function createNewPost(
  db: PrismaClient,
  title: string,
  description: string,
  space_id: string,
  userId: string
) {
  await db.post.create({
    data: {
      title,
      content: description,
      authorId: userId,
      spaceId: space_id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });
}

export async function createDraftPost(
  db: PrismaClient,
  title: string,
  description: string,
  space_id: string,
  userId: string
) {
  await db.post.create({
    data: {
      title: title || 'Untitled',
      content: description,
      authorId: userId,
      spaceId: space_id,
      status: 'DRAFT',
      publishedAt: null,
    },
  });
}
