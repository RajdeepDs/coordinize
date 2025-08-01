import { TRPCError } from '@trpc/server';
import { z } from 'zod/v4';
import { createDraftPost, createNewPost } from '@/lib/mutations';
import { createPostTimelineEvent } from '@/lib/mutations/timeline-helpers';
import {
  getDraftPostsQuery,
  getPostByIdQuery,
  getPublishedPostsQuery,
  searchPostsQuery,
} from '@/lib/queries';
import {
  draftPostSchema,
  postSchema,
  updatePostSchema,
} from '@/lib/schemas/post';
import { createTRPCRouter, protectedProcedure } from '../init';

export const postRouter = createTRPCRouter({
  getAllPublished: protectedProcedure.query(
    async ({ ctx: { session, workspaceId } }) => {
      const publishedPosts = await getPublishedPostsQuery(
        session.user.id,
        workspaceId
      );

      return publishedPosts;
    }
  ),

  getPostById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx: { session } }) => {
      const { id } = input;
      const post = await getPostByIdQuery(id, session.user.id);

      return post;
    }),

  getDrafts: protectedProcedure.query(async ({ ctx: { session } }) => {
    const draftPosts = await getDraftPostsQuery(session.user.id);
    return draftPosts;
  }),

  search: protectedProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ input, ctx: { session, workspaceId } }) => {
      const { query } = input;
      const searchResults = await searchPostsQuery(
        query,
        workspaceId,
        session.user.id
      );
      return searchResults;
    }),

  create: protectedProcedure
    .input(postSchema)
    .mutation(async ({ input, ctx: { db, session, workspaceId } }) => {
      const { title, description, space_id } = input;

      await createNewPost(
        db,
        title,
        description,
        space_id,
        session.user.id,
        workspaceId
      );
    }),

  createDraft: protectedProcedure
    .input(draftPostSchema)
    .mutation(async ({ input, ctx: { db, session, workspaceId } }) => {
      const { title, description, space_id } = input;

      await createDraftPost(
        db,
        title || '',
        description || '',
        space_id,
        session.user.id,
        workspaceId
      );
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { id } = input;

      const post = await db.post.findUnique({
        where: { id },
        select: { authorId: true, workspaceId: true },
      });

      if (!post) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Post not found.',
        });
      }

      if (post.authorId !== session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized: Only the author can delete this post.',
        });
      }

      await db.post.delete({
        where: { id },
      });
    }),

  update: protectedProcedure
    .input(updatePostSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { id, title, content } = input;

      const existingPost = await db.post.findUnique({
        where: { id },
        select: { authorId: true, workspaceId: true, title: true },
      });

      if (!existingPost) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Post not found.',
        });
      }

      if (existingPost.authorId !== session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized: Only the author can edit this post.',
        });
      }

      const updateData: Record<string, string> = {};
      let titleChanged = false;

      if (title !== undefined && title !== existingPost.title) {
        updateData.title = title;
        titleChanged = true;
      }
      if (content !== undefined) {
        updateData.content = content;
      }

      if (Object.keys(updateData).length > 0) {
        await db.post.update({
          where: { id },
          data: updateData,
        });

        // Create timeline event for title changes
        if (titleChanged) {
          await createPostTimelineEvent(db, {
            action: 'UPDATED_TITLE',
            postId: id,
            actorId: session.user.id,
            metadata: {
              oldTitle: existingPost.title,
              newTitle: title,
            },
          });
        }
      }
    }),

  resolve: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { id } = input;

      const post = await db.post.findUnique({
        where: { id },
        select: { resolvedAt: true, workspaceId: true },
      });

      if (!post) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Post not found.',
        });
      }

      await db.post.update({
        where: { id },
        data: { resolvedById: session.user.id, resolvedAt: new Date() },
      });

      // Create timeline event for resolving post
      await createPostTimelineEvent(db, {
        action: 'RESOLVED',
        postId: id,
        actorId: session.user.id,
        metadata: {
          resolvedAt: new Date().toISOString(),
        },
      });
    }),

  unresolve: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { id } = input;

      const post = await db.post.findUnique({
        where: { id },
        select: { resolvedAt: true, workspaceId: true, authorId: true },
      });

      if (!post) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Post not found.',
        });
      }

      if (!post.resolvedAt) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Post is not resolved.',
        });
      }

      await db.post.update({
        where: { id },
        data: { resolvedById: null, resolvedAt: null },
      });

      // Create timeline event for unresolving post
      await createPostTimelineEvent(db, {
        action: 'REOPENED',
        postId: id,
        actorId: session.user.id,
        metadata: {
          unresolvedAt: new Date().toISOString(),
        },
      });
    }),

  archive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { id } = input;

      const post = await db.post.findUnique({
        where: { id },
        select: { authorId: true, archived: true, workspaceId: true },
      });

      if (!post) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Post not found.',
        });
      }

      if (post.authorId !== session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized: Only the author can archive this post.',
        });
      }

      await db.post.update({
        where: { id },
        data: { archived: true },
      });
    }),

  movePostToSpace: protectedProcedure
    .input(z.object({ postId: z.string(), spaceId: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { postId, spaceId } = input;

      const post = await db.post.findUnique({
        where: { id: postId },
        select: { authorId: true, workspaceId: true, spaceId: true },
      });

      if (!post) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Post not found.',
        });
      }

      if (post.authorId !== session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized: Only the author can move this post.',
        });
      }

      const oldSpaceId = post.spaceId;

      await db.post.update({
        where: { id: postId },
        data: { spaceId },
      });

      // Create timeline event for moving post to space
      await createPostTimelineEvent(db, {
        action: 'MOVED_SPACE',
        postId,
        actorId: session.user.id,
        referenceType: 'Space',
        referenceId: spaceId,
        metadata: {
          oldSpaceId,
          newSpaceId: spaceId,
        },
      });
    }),

  pinPostToSpace: protectedProcedure
    .input(z.object({ postId: z.string(), pinned: z.boolean() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { postId, pinned } = input;

      const post = await db.post.findUnique({
        where: { id: postId },
        select: { authorId: true, workspaceId: true },
      });

      if (!post) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Post not found.',
        });
      }

      if (post.authorId !== session.user.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized: Only the author can pin/unpin this post.',
        });
      }

      await db.post.update({
        where: { id: postId },
        data: { pinned },
      });
    }),
});
