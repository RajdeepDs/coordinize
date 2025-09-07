import { z } from "zod/v4";

export const workspaceSetupSchema = z.object({
  workspaceName: z
    .string()
    .min(3, "Workspace name must be at least 3 characters.")
    .max(32, "Workspace name must be less than 32 characters."),
  workspaceURL: z
    .string()
    .min(3, "Workspace URL must be at least 3 characters.")
    .max(32, "Workspace URL must be less than 32 characters.")
    .regex(
      /^[a-z0-9-]+$/,
      "Workspace URL can only contain lowercase letters, numbers, and hyphens."
    )
    .refine(
      (val) => !(val.startsWith("-") || val.endsWith("-")),
      "Workspace URL cannot start or end with a hyphen."
    ),
});
export type WorkspaceSetupSchema = z.infer<typeof workspaceSetupSchema>;
