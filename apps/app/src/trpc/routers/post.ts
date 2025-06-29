import { createNewPost } from '@/lib/mutations';
import { postSchema } from '@/lib/schemas/post';
import { createTRPCRouter, protectedProcedure } from '../init';

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(postSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { title, description, space_id } = input;

      await createNewPost(db, title, description, space_id, session.user.id);
    }),
});
