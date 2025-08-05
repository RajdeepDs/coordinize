import type { PrismaClient } from '@coordinize/database/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod/v4';
import { createTRPCRouter, protectedProcedure } from '../init';

async function validateCommentExists(db: PrismaClient, commentId: string) {
  const comment = await db.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Comment not found.',
    });
  }

  return comment;
}

export const commentReactionRouter = createTRPCRouter({
  getByCommentId: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .query(async ({ input, ctx: { db, session } }) => {
      const { commentId } = input;

      const reactions = await db.commentReaction.findMany({
        where: { commentId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
      });

      const groupedReactions = reactions.reduce(
        (
          acc: Record<
            string,
            {
              emoji: string;
              count: number;
              users: { id: string; name: string; image: string | null }[];
              hasReacted: boolean;
            }
          >,
          reaction
        ) => {
          if (!acc[reaction.emoji]) {
            acc[reaction.emoji] = {
              emoji: reaction.emoji,
              count: 0,
              users: [],
              hasReacted: false,
            };
          }
          const group = acc[reaction.emoji];
          if (group) {
            group.count++;
            group.users.push(reaction.user);
            if (reaction.user.id === session.user.id) {
              group.hasReacted = true;
            }
          }
          return acc;
        },
        {} as Record<
          string,
          {
            emoji: string;
            count: number;
            users: { id: string; name: string; image: string | null }[];
            hasReacted: boolean;
          }
        >
      );

      return Object.values(groupedReactions);
    }),

  add: protectedProcedure
    .input(z.object({ commentId: z.string(), emoji: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { commentId, emoji } = input;

      await validateCommentExists(db, commentId);

      const existingReaction = await db.commentReaction.findUnique({
        where: {
          commentId_userId_emoji: {
            commentId,
            userId: session.user.id,
            emoji,
          },
        },
      });

      if (existingReaction) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You have already reacted with this emoji.',
        });
      }

      await db.commentReaction.create({
        data: {
          commentId,
          userId: session.user.id,
          emoji,
        },
      });

      return { success: true };
    }),

  remove: protectedProcedure
    .input(z.object({ commentId: z.string(), emoji: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { commentId, emoji } = input;

      const reaction = await db.commentReaction.findUnique({
        where: {
          commentId_userId_emoji: {
            commentId,
            userId: session.user.id,
            emoji,
          },
        },
      });

      if (!reaction) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Reaction not found.',
        });
      }

      await db.commentReaction.delete({
        where: {
          commentId_userId_emoji: {
            commentId,
            userId: session.user.id,
            emoji,
          },
        },
      });

      return { success: true };
    }),

  toggle: protectedProcedure
    .input(z.object({ commentId: z.string(), emoji: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { commentId, emoji } = input;

      await validateCommentExists(db, commentId);

      const toggleResult = await db.$transaction(async (tx) => {
        const existingReaction = await tx.commentReaction.findUnique({
          where: {
            commentId_userId_emoji: {
              commentId,
              userId: session.user.id,
              emoji,
            },
          },
        });

        if (existingReaction) {
          await tx.commentReaction.delete({
            where: {
              commentId_userId_emoji: {
                commentId,
                userId: session.user.id,
                emoji,
              },
            },
          });
          return { action: 'removed' as const };
        }

        await tx.commentReaction.create({
          data: {
            commentId,
            userId: session.user.id,
            emoji,
          },
        });
        return { action: 'added' as const };
      });

      return toggleResult;
    }),
});
