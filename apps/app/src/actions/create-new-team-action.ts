"use server";

import { authActionClient } from "./safe-action";
import { createNewTeamSchema } from "./schema";

export const createNewTeamAction = authActionClient
  .metadata({
    name: "create-new-team",
  })
  .schema(createNewTeamSchema)
  .action(
    async ({
      parsedInput: { teamName, teamIdentifier },
      ctx: { user, db },
    }) => {
      const workspace = await db.workspace.findUnique({
        where: { slug: user.defaultWorkspace },
      });

      if (!workspace) {
        throw new Error("Workspace not found.");
      }

      const team = await db.team.create({
        data: {
          name: teamName,
          identifier: teamIdentifier,
          workspaceId: workspace.id,
          createdBy: user.id,
        },
      });

      await db.teamMember.create({
        data: {
          teamId: team.id,
          userId: user.id,
          role: "ADMIN",
        },
      });

      // TODO: Add a redirect to the team page.
    },
  );
