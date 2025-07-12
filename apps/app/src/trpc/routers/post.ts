import { z } from 'zod';
import { createDraftPost, createNewPost } from '@/lib/mutations';
import {
  getDraftPostsQuery,
  getPostByIdQuery,
  getPublishedPostsQuery,
} from '@/lib/queries';
import { draftPostSchema, postSchema } from '@/lib/schemas/post';
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
    .mutation(async ({ input, ctx: { db } }) => {
      const { id } = input;

      await db.post.delete({
        where: { id },
      });
    }),
  resolve: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { id } = input;

      await db.post.update({
        where: { id },
        data: { resolvedById: session.user.id, resolvedAt: new Date() },
      });
    }),

  archive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx: { db } }) => {
      const { id } = input;

      await db.post.update({
        where: { id },
        data: { archived: true },
      });
    }),
});
