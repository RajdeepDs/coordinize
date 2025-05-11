import { getTeamsQuery } from "@/lib/queries";
import { createTRPCRouter, protectedProcedure } from "../init";

export const teamRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx: { workspaceId } }) => {
    const teams = await getTeamsQuery(workspaceId);
    return teams.map(({ _count, ...team }) => ({
      ...team,
      membersCount: _count.members,
    }));
  }),
});
