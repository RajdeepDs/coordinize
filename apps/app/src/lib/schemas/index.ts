import { z } from 'zod/v4';

export const welcomeStepSchema = z.object({
  preferredName: z.string(),
  profilePicURL: z.url().optional(),
});

export const workspaceSetupStepSchema = z.object({
  workspaceName: z
    .string()
    .min(3, 'Workspace name must be at least 3 characters.')
    .max(32, 'Workspace name must be less than 32 characters.'),
  workspaceSlug: z.string(),
  workspaceLogoURL: z.url().or(z.string().length(0)),
});

export const preferencesStepSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  timezone: z.string().min(1, 'Timezone is required.'),
});

export const createSpaceSchema = z.object({
  name: z.string().min(3, 'Space name must be at least 3 characters.'),
  identifier: z.string().min(3, 'Identifier must be at least 3 characters.'),
  about: z.string(),
  icon: z.string().optional(),
});

export const togglefavoriteSchema = z.object({
  type: z.enum(['post', 'space']),
  id: z.string(),
});
