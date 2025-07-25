import { OnboardingStep, type PrismaClient } from '@coordinize/database/db';

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
  icon: string | undefined,
  workspaceId: string,
  userId: string
) {
  const space = await db.space.create({
    data: {
      name,
      identifier,
      about,
      icon,
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
  spaceId: string,
  userId: string,
  workspaceId: string
) {
  const post = await db.post.create({
    data: {
      title,
      content: description,
      authorId: userId,
      spaceId,
      workspaceId,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });
  return post;
}

export async function createDraftPost(
  db: PrismaClient,
  title: string,
  description: string,
  spaceId: string,
  userId: string,
  workspaceId: string
) {
  await db.post.create({
    data: {
      title: title || 'Untitled',
      content: description,
      authorId: userId,
      spaceId,
      workspaceId,
      status: 'DRAFT',
      publishedAt: null,
    },
  });
}

export async function createCommentMutation(
  db: PrismaClient,
  content: string,
  postId: string,
  authorId: string,
  parentId?: string
) {
  const comment = await db.comment.create({
    data: {
      content,
      postId,
      authorId,
      parentId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  // Update post's lastActivityAt
  await db.post.update({
    where: { id: postId },
    data: { lastActivityAt: new Date() },
  });

  return comment;
}

export async function updateCommentMutation(
  db: PrismaClient,
  commentId: string,
  content: string
) {
  return await db.comment.update({
    where: { id: commentId },
    data: {
      content,
      edited: true,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

export async function deleteCommentMutation(
  db: PrismaClient,
  commentId: string
) {
  return await db.comment.delete({
    where: { id: commentId },
  });
}
