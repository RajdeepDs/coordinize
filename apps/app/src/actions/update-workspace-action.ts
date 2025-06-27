'use server';

import { revalidatePath } from 'next/cache';
import { authActionClient } from './safe-action';
import { updateWorkspaceSchema } from './schema';

export const updateWorkspaceAction = authActionClient
  .metadata({
    name: 'update-workspace',
  })
  .schema(updateWorkspaceSchema)
  .action(async ({ parsedInput, ctx: { user, db } }) => {
    const { workspaceName, workspaceURL, workspaceLogoURL } = parsedInput;

    const workspaceSlug = user.defaultWorkspace;

    if (!workspaceSlug) {
      console.error('Missing default workspace Slug for user:', user.id);
      throw new Error('Workspace not found');
    }

    // Build update object dynamically
    const updateData: Record<string, string> = {};
    if (workspaceName) updateData.name = workspaceName;
    if (workspaceURL) updateData.slug = workspaceURL;
    if (workspaceLogoURL) updateData.logo = workspaceLogoURL;

    // Update only if there's something to update
    if (Object.keys(updateData).length > 0) {
      await db.workspace.update({
        where: {
          slug: workspaceSlug,
        },
        data: updateData,
      });

      // Update the defaultWorkspace field in the user only if the workspaceURL has changed
      if (workspaceURL && workspaceURL !== workspaceSlug) {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            defaultWorkspace: workspaceURL,
          },
        });
      }

      revalidatePath('/settings/workspace');
    }
  });
