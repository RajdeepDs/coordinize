import { createTRPCRouter, protectedProcedure } from '../init';
import { togglefavoriteSchema } from '../schemas';

export const favoriteRouter = createTRPCRouter({
  getFavorites: protectedProcedure.query(async ({ ctx: { session, db } }) => {
    const userId = session.user.id;
    return await db.favorite.findMany({
      where: { userId },
      include: {
        post: true,
        space: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),

  toggleFavorite: protectedProcedure
    .input(togglefavoriteSchema)
    .mutation(async ({ input, ctx: { session, db } }) => {
      const { type, id } = input;
      const userId = session.user.id;

      const where =
        type === 'post' ? { userId, postId: id } : { userId, spaceId: id };

      const existing = await db.favorite.findFirst({ where });

      if (existing) {
        await db.favorite.delete({ where: { id: existing.id } });
        return { favorited: false };
      }

      await db.favorite.create({ data: where });
      return { favorited: true };
    }),
});
