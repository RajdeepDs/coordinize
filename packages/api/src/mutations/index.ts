import type { PrismaClient } from '@coordinize/database/db';

// Define a type that can accept both PrismaClient and transaction client
type PrismaTransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
type DatabaseClient = PrismaClient | PrismaTransactionClient;

export async function createNewSpace(
  db: DatabaseClient,
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

  return space;
}

export async function createNewPost(
  db: DatabaseClient,
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
  db: DatabaseClient,
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
  db: DatabaseClient,
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
  db: DatabaseClient,
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
  db: DatabaseClient,
  commentId: string
) {
  return await db.comment.delete({
    where: { id: commentId },
  });
}
