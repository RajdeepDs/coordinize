import { TRPCError } from '@trpc/server';
import {
  createCommentMutation,
  deleteCommentMutation,
  updateCommentMutation,
} from '@/lib/mutations';
import { createPostTimelineEvent } from '@/lib/mutations/timeline-helpers';
import { createPostCommentNotification } from '@/lib/notifications';
import { getCommentByIdQuery, getPostCommentsQuery } from '@/lib/queries';
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentsSchema,
  updateCommentSchema,
} from '@/lib/schemas/comment';
import { createTRPCRouter, protectedProcedure } from '../init';

export const commentRouter = createTRPCRouter({
  getComments: protectedProcedure
    .input(getCommentsSchema)
    .query(async ({ input, ctx: { db } }) => {
      const { postId } = input;
      return await getPostCommentsQuery(db, postId);
    }),

  create: protectedProcedure
    .input(createCommentSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { content, postId, parentId } = input;

      const post = await db.post.findUnique({
        where: { id: postId },
        select: {
          id: true,
          title: true,
          authorId: true,
          workspaceId: true,
        },
      });

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found.',
        });
      }

      const comment = await createCommentMutation(
        db,
        content,
        postId,
        session.user.id,
        parentId
      );

      // Create timeline event for the comment
      await createPostTimelineEvent(db, {
        action: 'COMMENTED',
        postId,
        actorId: session.user.id,
        referenceType: 'Comment',
        referenceId: comment.id,
      });

      // Create notification for the post author (if not commenting on their own post)
      if (post.authorId === session.user.id) {
        await createPostCommentNotification(db, {
          postId: post.id,
          postTitle: post.title,
          postAuthorId: post.authorId,
          workspaceId: post.workspaceId,
          commentAuthorId: session.user.id,
          commentAuthorName: session.user.name || 'Someone',
        });
      }

      return comment;
    }),

  update: protectedProcedure
    .input(updateCommentSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { id, content } = input;

      const existingComment = await getCommentByIdQuery(db, id);

      if (!existingComment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Comment not found.',
        });
      }

      if (existingComment.authorId !== session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized: Only the author can edit this comment.',
        });
      }

      return await updateCommentMutation(db, id, content);
    }),

  delete: protectedProcedure
    .input(deleteCommentSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { id } = input;

      const existingComment = await getCommentByIdQuery(db, id);

      if (!existingComment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Comment not found.',
        });
      }

      if (existingComment.authorId !== session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized: Only the author can delete this comment.',
        });
      }

      return await deleteCommentMutation(db, id);
    }),
});
