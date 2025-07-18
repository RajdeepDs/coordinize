import type { Prisma, PrismaClient } from '@coordinize/database/db';

export async function createPostTimelineEvent(
  db: PrismaClient,
  data: {
    action:
      | 'UPDATED_TITLE'
      | 'MOVED_SPACE'
      | 'RESOLVED'
      | 'REOPENED'
      | 'COMMENTED';
    postId: string;
    actorId: string;
    metadata?: Prisma.InputJsonValue;
    referenceId?: string;
    referenceType?: string;
  }
) {
  // For non-comment actions, delete existing timeline events of the same action type
  // to avoid clutter (e.g., multiple space moves)
  if (data.action !== 'COMMENTED') {
    await db.timelineEvent.deleteMany({
      where: {
        subjectType: 'Post',
        subjectId: data.postId,
        action: data.action,
      },
    });
  }

  return await db.timelineEvent.create({
    data: {
      action: data.action,
      actorId: data.actorId,
      actorType: 'User',
      subjectType: 'Post',
      subjectId: data.postId,
      referenceType: data.referenceType,
      referenceId: data.referenceId,
      metadata: data.metadata,
    },
  });
}
