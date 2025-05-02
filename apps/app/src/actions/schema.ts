import { z } from "zod";

export const joinWaitlistSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
});

export const welcomeStepSchema = z.object({
  preferredName: z.string(),
  profilePicURL: z.string().url().optional(),
});

export const workspaceSetupStepSchema = z.object({
  workspaceName: z.string(),
  workspaceURL: z.string(),
  workspaceLogoURL: z.string().url().optional(),
});

export const preferencesStepSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  timezone: z.string(),
});

export const updateProfileSchema = z.object({
  preferredName: z.string().min(1, { message: "Name is required." }).optional(),
  image: z
    .string()
    .refine((val) => !val || val.startsWith("https"), {
      message: "Image must be empty or a valid URL",
    })
    .optional(),
});
