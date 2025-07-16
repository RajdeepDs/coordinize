import { TRPCError } from '@trpc/server';
import { z } from 'zod/v4';
import { createDraftPost, createNewPost } from '@/lib/mutations';
import {
  getDraftPostsQuery,
  getPostByIdQuery,
  getPublishedPostsQuery,
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
    .query(async ({ input }) => {
      const { id } = input;
      const post = await getPostByIdQuery(id);

      return post;
    }),

  getDrafts: protectedProcedure.query(async ({ ctx: { session } }) => {
    const draftPosts = await getDraftPostsQuery(session.user.id);
    return draftPosts;
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
        select: { authorId: true, workspaceId: true },
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
      if (title !== undefined) {
        updateData.title = title;
      }
      if (content !== undefined) {
        updateData.content = content;
      }

      if (Object.keys(updateData).length > 0) {
        await db.post.update({
          where: { id },
          data: updateData,
        });
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
});
