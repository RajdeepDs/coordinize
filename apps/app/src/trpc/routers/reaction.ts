import type { PrismaClient } from '@coordinize/database/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod/v4';
import { createTRPCRouter, protectedProcedure } from '../init';

async function validatePostExists(db: PrismaClient, postId: string) {
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { id: true },
  });

  if (!post) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Post not found.',
    });
  }
}

export const reactionRouter = createTRPCRouter({
  getByPostId: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx: { db, session } }) => {
      const { postId } = input;

      const reactions = await db.reaction.findMany({
        where: { postId },
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
        (acc, reaction) => {
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
    .input(z.object({ postId: z.string(), emoji: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { postId, emoji } = input;

      await validatePostExists(db, postId);

      const existingReaction = await db.reaction.findUnique({
        where: {
          postId_userId_emoji: {
            postId,
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

      await db.reaction.create({
        data: {
          postId,
          userId: session.user.id,
          emoji,
        },
      });

      return { success: true };
    }),

  remove: protectedProcedure
    .input(z.object({ postId: z.string(), emoji: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { postId, emoji } = input;

      const reaction = await db.reaction.findUnique({
        where: {
          postId_userId_emoji: {
            postId,
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

      await db.reaction.delete({
        where: {
          postId_userId_emoji: {
            postId,
            userId: session.user.id,
            emoji,
          },
        },
      });

      return { success: true };
    }),

  toggle: protectedProcedure
    .input(z.object({ postId: z.string(), emoji: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { postId, emoji } = input;

      await validatePostExists(db, postId);

      const toggleResult = await db.$transaction(async (tx) => {
        const existingReaction = await tx.reaction.findUnique({
          where: {
            postId_userId_emoji: {
              postId,
              userId: session.user.id,
              emoji,
            },
          },
        });

        if (existingReaction) {
          await tx.reaction.delete({
            where: {
              postId_userId_emoji: {
                postId,
                userId: session.user.id,
                emoji,
              },
            },
          });
          return { action: 'removed' as const };
        }

        await tx.reaction.create({
          data: {
            postId,
            userId: session.user.id,
            emoji,
          },
        });
        return { action: 'added' as const };
      });

      return toggleResult;
    }),
});
