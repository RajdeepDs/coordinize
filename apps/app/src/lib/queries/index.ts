'use server';

import {
  database,
  type Prisma,
  type PrismaClient,
  type TimelineAction,
} from '@coordinize/database/db';

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
          icon: true,
        },
      },
      author: { select: { id: true, name: true, image: true } },
    },
  });
}

export async function getPostByIdQuery(postId: string, userId?: string) {
  return await database.post.findUnique({
    where: { id: postId },
    include: {
      space: {
        select: {
          id: true,
          name: true,
          identifier: true,
          icon: true,
        },
      },
      author: { select: { id: true, name: true, image: true } },
      resolvedBy: { select: { id: true, name: true, image: true } },
      favorite: userId
        ? {
            where: {
              userId,
            },
            select: {
              id: true,
            },
          }
        : {
            select: {
              id: true,
            },
          },
    },
  });
}

export async function getSpaceWithPublishedPosts(
  identifier: string,
  workspaceId: string,
  userId?: string
) {
  return await database.space.findFirst({
    where: {
      identifier,
      workspaceId,
    },
    include: {
      posts: {
        where: {
          status: 'PUBLISHED',
          resolvedAt: null,
          archived: false,
          publishedAt: { not: null },
        },
        orderBy: {
          publishedAt: 'desc',
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
      },
      members: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      favorite: userId
        ? {
            where: {
              userId,
            },
            select: {
              id: true,
            },
          }
        : {
            select: {
              id: true,
            },
          },
    },
  });
}

export async function getPostTimelineEventsQuery(
  db: PrismaClient,
  postId: string
) {
  return await db.timelineEvent.findMany({
    where: {
      subjectType: 'Post',
      subjectId: postId,
    },
    include: {
      actor: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function createTimelineEventMutation(
  db: PrismaClient,
  data: {
    actorId: string;
    actorType: string;
    subjectType: string;
    subjectId: string;
    referenceType?: string;
    referenceId?: string;
    action: TimelineAction;
    metadata?: Prisma.InputJsonValue;
  }
) {
  // For non-comment actions, delete existing timeline events of the same action type
  // to avoid clutter (e.g., multiple space moves, title updates, etc.)
  if (data.action !== 'COMMENTED') {
    await db.timelineEvent.deleteMany({
      where: {
        subjectType: data.subjectType,
        subjectId: data.subjectId,
        action: data.action,
      },
    });
  }

  return await db.timelineEvent.create({
    data,
    include: {
      actor: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}
