import type {
  NotificationType,
  Prisma,
  PrismaClient,
} from '@coordinize/database/db';

interface CreateNotificationParams {
  db: PrismaClient;
  userId: string;
  workspaceId: string;
  type: NotificationType;
  title: string;
  message: string;
  actorId?: string;
  subjectId?: string;
  subjectType?: string;
  metadata?: Prisma.InputJsonValue;
}

export async function createNotification({
  db,
  userId,
  workspaceId,
  type,
  title,
  message,
  actorId,
  subjectId,
  subjectType,
  metadata,
}: CreateNotificationParams) {
  if (actorId && actorId === userId) {
    return null;
  }

  return await db.notification.create({
    data: {
      userId,
      workspaceId,
      type,
      title,
      message,
      actorId,
      subjectId,
      subjectType,
      metadata,
    },
  });
}

export async function createPostCommentNotification(
  db: PrismaClient,
  {
    postId,
    postTitle,
    postAuthorId,
    workspaceId,
    commentAuthorId,
    commentAuthorName,
  }: {
    postId: string;
    postTitle: string;
    postAuthorId: string;
    workspaceId: string;
    commentAuthorId: string;
    commentAuthorName: string;
  }
) {
  return await createNotification({
    db,
    userId: postAuthorId,
    workspaceId,
    type: 'POST_COMMENT',
    title: 'New comment on your post',
    message: `${commentAuthorName} commented on "${postTitle}"`,
    actorId: commentAuthorId,
    subjectId: postId,
    subjectType: 'Post',
    metadata: {
      postId,
      postTitle,
    },
  });
}

export async function createPostUpdateNotification(
  db: PrismaClient,
  {
    postId,
    postTitle,
    subscriberIds,
    workspaceId,
    actorId,
    actorName,
    updateType,
  }: {
    postId: string;
    postTitle: string;
    subscriberIds: string[];
    workspaceId: string;
    actorId: string;
    actorName: string;
    updateType: 'resolved' | 'reopened' | 'moved' | 'updated';
  }
) {
  const typeMap = {
    resolved: 'POST_RESOLVED' as const,
    reopened: 'POST_REOPENED' as const,
    moved: 'POST_UPDATE' as const,
    updated: 'POST_UPDATE' as const,
  };

  const messageMap = {
    resolved: `${actorName} resolved "${postTitle}"`,
    reopened: `${actorName} reopened "${postTitle}"`,
    moved: `${actorName} moved "${postTitle}"`,
    updated: `${actorName} updated "${postTitle}"`,
  };

  const titleMap = {
    resolved: 'Post resolved',
    reopened: 'Post reopened',
    moved: 'Post moved',
    updated: 'Post updated',
  };

  const notifications = subscriberIds.map((userId) =>
    createNotification({
      db,
      userId,
      workspaceId,
      type: typeMap[updateType],
      title: titleMap[updateType],
      message: messageMap[updateType],
      actorId,
      subjectId: postId,
      subjectType: 'Post',
      metadata: {
        postId,
        postTitle,
        updateType,
      },
    })
  );

  return await Promise.all(notifications);
}

export async function createMentionNotification(
  db: PrismaClient,
  {
    mentionedUserId,
    workspaceId,
    actorId,
    actorName,
    contentTitle,
    contentType,
    subjectId,
  }: {
    mentionedUserId: string;
    workspaceId: string;
    actorId: string;
    actorName: string;
    contentTitle: string;
    contentType: 'post' | 'comment';
    subjectId: string;
  }
) {
  return await createNotification({
    db,
    userId: mentionedUserId,
    workspaceId,
    type: 'POST_MENTION',
    title: `You were mentioned in a ${contentType}`,
    message: `${actorName} mentioned you in "${contentTitle}"`,
    actorId,
    subjectId,
    subjectType: contentType === 'post' ? 'Post' : 'Comment',
    metadata: {
      contentTitle,
      contentType,
    },
  });
}
