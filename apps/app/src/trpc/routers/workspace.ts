import { getWorkspaceMembersQuery, getWorkspaceQuery } from "@/lib/queries";
import { createTRPCRouter, protectedProcedure } from "../init";

export const workspaceRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx: { workspaceId } }) => {
    const workspace = await getWorkspaceQuery(workspaceId);
    return workspace;
  }),
  members: protectedProcedure.query(async ({ ctx: { workspaceId } }) => {
    const members = await getWorkspaceMembersQuery(workspaceId);
    return members;
  }),
});
