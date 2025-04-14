import { z } from "zod";

export const joinWaitlistSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
});

export const onboardingSchema = z.object({
  preferredName: z.string(),
  profilePicURL: z.string(),
  workspaceName: z.string(),
  workspaceURL: z.string(),
  workspaceLogoURL: z.string(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  timezone: z.string(),
});
