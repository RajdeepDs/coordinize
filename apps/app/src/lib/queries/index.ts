'use server';

import { database } from '@coordinize/database/db';

export async function getUserQuery(userId: string) {
  return await database.user.findUnique({ where: { id: userId } });
}

export async function getWorkspaceQuery(workspaceId: string) {
  return await database.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  });
}

export async function getSpacesQuery(workspaceId: string) {
  return await database.space.findMany({
    where: {
      workspaceId,
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
  });
}

export async function getWorkspaceMembersQuery(workspaceId: string) {
  return await database.workspaceMember.findMany({
    where: {
      workspaceId,
    },
    include: {
      user: true,
    },
  });
}

export async function getDraftPostsQuery(userId: string) {
  return await database.post.findMany({
    where: {
      authorId: userId,
      status: 'DRAFT',
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

export async function getPublishedPostsQuery(
  authorId: string,
  workspaceId: string
) {
  return await database.post.findMany({
    where: {
      workspaceId,
      authorId,
      AND: {
        status: 'PUBLISHED',
        resolvedAt: null,
        archived: false,
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    include: {
      space: {
        select: {
          id: true,
          name: true,
          identifier: true,
        },
      },
      author: { select: { id: true, name: true, image: true } },
    },
  });
}

export async function getPostByIdQuery(postId: string) {
  return await database.post.findUnique({
    where: { id: postId },
    include: {
      space: {
        select: {
          id: true,
          name: true,
          identifier: true,
        },
      },
      author: { select: { id: true, name: true, image: true } },
    },
  });
}
