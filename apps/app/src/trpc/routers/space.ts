import { createSpaceSchema } from "@/lib/schemas";
import { createTRPCRouter, protectedProcedure } from "../init";

export const spaceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createSpaceSchema)
    .mutation(async ({ input, ctx: { db, session, workspaceId } }) => {
      const { name, identifier, about } = input;

      const space = await db.space.create({
        data: {
          name,
          identifier,
          about,
          workspaceId,
          createdBy: session.user.id,
        },
      });

      await db.spaceMember.create({
        data: {
          spaceId: space.id,
          userId: session.user.id,
          role: "ADMIN",
        },
      });
    }),
});
