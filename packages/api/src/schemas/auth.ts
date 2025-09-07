import { z } from "zod/v4";

export const emailLinkSchema = z.object({
  email: z.email({
    error: (iss) => {
      return iss.input === ""
        ? "Please enter an email address for login."
        : "Please enter a valid email address for login.";
    },
  }),
});

export type EmailLinkSchema = z.infer<typeof emailLinkSchema>;

export const loginCodeSchema = z.object({
  code: z.string().min(1, "Please enter the code sent to your email."),
});

export type LoginCodeSchema = z.infer<typeof loginCodeSchema>;
