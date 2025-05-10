import { getWorkspaceMembersQuery, getWorkspaceQuery } from "@/queries";
import { createTRPCRouter, protectedProcedure } from "../init";

export const workspaceRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx: { session } }) => {
    const workspace = await getWorkspaceQuery(session.user.defaultWorkspace);

    return workspace;
  }),
  members: protectedProcedure.query(async ({ ctx: { workspaceId } }) => {
    const members = await getWorkspaceMembersQuery(workspaceId);

    return members;
  }),
});
