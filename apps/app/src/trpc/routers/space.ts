import { createNewSpace } from "@/lib/mutations";
import { getSpacesQuery } from "@/lib/queries";
import { createSpaceSchema } from "@/lib/schemas";
import { createTRPCRouter, protectedProcedure } from "../init";

export const spaceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx: { workspaceId } }) => {
    const spaces = await getSpacesQuery(workspaceId);
    return spaces.map(({ _count, ...space }) => ({
      ...space,
      membersCount: _count.members,
    }));
  }),
  create: protectedProcedure
    .input(createSpaceSchema)
    .mutation(async ({ input, ctx: { db, session, workspaceId } }) => {
      const { name, identifier, about } = input;

      await createNewSpace(
        db,
        name,
        identifier,
        about,
        workspaceId,
        session.user.id,
      );

      return {
        workspaceSlug: session.user.defaultWorkspace,
      };
    }),
});
