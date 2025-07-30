import { z } from 'zod/v4';

export const workspaceSetupSchema = z.object({
  workspaceName: z
    .string()
    .min(3, 'Workspace name must be at least 3 characters.')
    .max(32, 'Workspace name must be less than 32 characters.'),
  workspaceURL: z.string(),
});
export type WorkspaceSetupSchema = z.infer<typeof workspaceSetupSchema>;
