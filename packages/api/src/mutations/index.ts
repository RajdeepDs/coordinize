import type { PrismaClient } from "@coordinize/database/db";

// Define a type that can accept both PrismaClient and transaction client
type PrismaTransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;
type DatabaseClient = PrismaClient | PrismaTransactionClient;

type CreateSpaceParams = {
  name: string;
  identifier: string;
  about?: string;
  icon?: string;
  workspaceId: string;
  userId: string;
};

export async function createNewSpace(
  db: DatabaseClient,
  params: CreateSpaceParams
) {
  const { name, identifier, about, icon, workspaceId, userId } = params;

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
      role: "ADMIN",
    },
  });

  return space;
}

type CreatePostParams = {
  title: string;
  description: string;
  spaceId: string;
  userId: string;
  workspaceId: string;
};

export async function createNewPost(
  db: DatabaseClient,
  params: CreatePostParams
) {
  const { title, description, spaceId, userId, workspaceId } = params;

  const post = await db.post.create({
    data: {
      title,
      content: description,
      authorId: userId,
      spaceId,
      workspaceId,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });
  return post;
}

type CreateDraftPostParams = {
  title: string;
  description: string;
  spaceId: string;
  userId: string;
  workspaceId: string;
};

export async function createDraftPost(
  db: DatabaseClient,
  params: CreateDraftPostParams
) {
  const { title, description, spaceId, userId, workspaceId } = params;

  return await db.post.create({
    data: {
      title: title || "Untitled",
      content: description,
      authorId: userId,
      spaceId,
      workspaceId,
      status: "DRAFT",
      publishedAt: null,
    },
  });
}

type CreateCommentParams = {
  content: string;
  postId: string;
  authorId: string;
  parentId?: string;
};

export async function createCommentMutation(
  db: DatabaseClient,
  params: CreateCommentParams
) {
  const { content, postId, authorId, parentId } = params;

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
