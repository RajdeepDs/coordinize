import { createDraftPost, createNewPost } from '@/lib/mutations';
import { getDraftPostsQuery } from '@/lib/queries';
import { draftPostSchema, postSchema } from '@/lib/schemas/post';
import { createTRPCRouter, protectedProcedure } from '../init';

export const postRouter = createTRPCRouter({
  getDrafts: protectedProcedure.query(async ({ ctx: { session } }) => {
    const draftPosts = await getDraftPostsQuery(session.user.id);
    return draftPosts;
  }),
  create: protectedProcedure
    .input(postSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { title, description, space_id } = input;

      await createNewPost(db, title, description, space_id, session.user.id);
    }),

  createDraft: protectedProcedure
    .input(draftPostSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { title, description, space_id } = input;

      await createDraftPost(
        db,
        title || '',
        description || '',
        space_id,
        session.user.id
      );
    }),
});
