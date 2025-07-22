import { z } from 'zod/v4';
import { createTRPCRouter, protectedProcedure } from '../init';

export const notificationRouter = createTRPCRouter({
  getInbox: protectedProcedure
    .input(
      z.object({
        filter: z.enum(['all', 'unread', 'archived']).default('all'),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx: { db, session, workspaceId } }) => {
      const { filter, limit, cursor } = input;

      const where = {
        userId: session.user.id,
        workspaceId,
        ...(filter === 'unread' && { read: false }),
        ...(filter === 'archived' && { archived: true }),
        ...(filter === 'all' && { archived: false }),
      };

      const notifications = await db.notification.findMany({
        where,
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
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor;
      if (notifications.length > limit) {
        const nextItem = notifications.pop();
        nextCursor = nextItem?.id;
      }

      return {
        notifications,
        nextCursor,
      };
    }),

  getCounts: protectedProcedure.query(
    async ({ ctx: { db, session, workspaceId } }) => {
      const [unreadCount, archivedCount] = await Promise.all([
        db.notification.count({
          where: {
            userId: session.user.id,
            workspaceId,
            read: false,
            archived: false,
          },
        }),
        db.notification.count({
          where: {
            userId: session.user.id,
            workspaceId,
            archived: true,
          },
        }),
      ]);

      return { unreadCount, archivedCount };
    }
  ),

  markAsRead: protectedProcedure
    .input(
      z.object({
        notificationIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { notificationIds } = input;

      await db.notification.updateMany({
        where: {
          id: { in: notificationIds },
          userId: session.user.id,
        },
        data: {
          read: true,
        },
      });
    }),

  markAllAsRead: protectedProcedure.mutation(
    async ({ ctx: { db, session, workspaceId } }) => {
      await db.notification.updateMany({
        where: {
          userId: session.user.id,
          workspaceId,
          read: false,
          archived: false,
        },
        data: {
          read: true,
        },
      });
    }
  ),

  archive: protectedProcedure
    .input(
      z.object({
        notificationIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { notificationIds } = input;

      await db.notification.updateMany({
        where: {
          id: { in: notificationIds },
          userId: session.user.id,
        },
        data: {
          archived: true,
          read: true, // Also mark as read when archiving
        },
      });
    }),

  unarchive: protectedProcedure
    .input(
      z.object({
        notificationIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { notificationIds } = input;

      await db.notification.updateMany({
        where: {
          id: { in: notificationIds },
          userId: session.user.id,
        },
        data: {
          archived: false,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        notificationIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { notificationIds } = input;

      await db.notification.deleteMany({
        where: {
          id: { in: notificationIds },
          userId: session.user.id,
        },
      });
    }),
});
