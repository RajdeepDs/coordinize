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

export async function searchPostsQuery(
  query: string,
  workspaceId: string,
  authorId: string
) {
  if (!query || query.trim().length === 0) {
    throw new Error('Search query cannot be empty or contain only whitespace');
  }

  return await database.post.findMany({
    where: {
      workspaceId,
      authorId,
      AND: {
        status: 'PUBLISHED',
        resolvedAt: null,
        archived: false,
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
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

async function processTimelineEvent(
  db: PrismaClient,
  event: {
    id: string;
    action: TimelineAction;
    referenceId: string | null;
    metadata: unknown;
    actor: { id: string; name: string; image: string | null } | null;
  }
) {
  if (event.action === 'MOVED_SPACE' && event.metadata) {
    const metadata = event.metadata as {
      oldSpaceId?: string;
      newSpaceId?: string;
    };

    const spaceIds = [metadata.oldSpaceId, metadata.newSpaceId].filter(
      Boolean
    ) as string[];

    const spaces = await db.space.findMany({
      where: {
        id: {
          in: spaceIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const spaceMap = new Map(spaces.map((space) => [space.id, space.name]));

    return {
      ...event,
      metadata: {
        ...metadata,
        oldSpaceName: metadata.oldSpaceId
          ? spaceMap.get(metadata.oldSpaceId)
          : undefined,
        newSpaceName: metadata.newSpaceId
          ? spaceMap.get(metadata.newSpaceId)
          : undefined,
      },
    };
  }

  if (event.action === 'COMMENTED' && event.referenceId) {
    // Fetch the comment data with nested replies
    const comment = await db.comment.findUnique({
      where: { id: event.referenceId },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        edited: true,
        authorId: true,
        postId: true,
        parentId: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        replies: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            edited: true,
            authorId: true,
            postId: true,
            parentId: true,
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            replies: {
              select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                edited: true,
                authorId: true,
                postId: true,
                parentId: true,
                author: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Only show top-level comments in timeline (parentId: null)
    // Replies will be shown nested under their parent comments
    if (comment && comment.parentId === null) {
      return {
        ...event,
        comment,
      };
    }

    // If this is a reply, don't show it as a separate timeline event
    return null;
  }

  return event;
}

export async function getPostTimelineEventsQuery(
  db: PrismaClient,
  postId: string
) {
  const timelineEvents = await db.timelineEvent.findMany({
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

  // For MOVED_SPACE actions, we need to fetch space names
  // For COMMENTED actions, we need to fetch comment data
  const eventsWithAdditionalData = await Promise.all(
    timelineEvents.map((event) => processTimelineEvent(db, event))
  );

  return eventsWithAdditionalData.filter(Boolean);
}

export async function getPostCommentsQuery(db: PrismaClient, postId: string) {
  return await db.comment.findMany({
    where: {
      postId,
      parentId: null, // Only get top-level comments
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      replies: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getCommentByIdQuery(db: PrismaClient, commentId: string) {
  return await db.comment.findUnique({
    where: { id: commentId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      post: {
        select: {
          id: true,
          authorId: true,
          workspaceId: true,
        },
      },
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
