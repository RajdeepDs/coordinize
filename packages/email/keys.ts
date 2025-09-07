import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    server: {
      NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),

      // Resend configuration (production)
      RESEND_FROM: z.string().min(1).optional(),
      RESEND_TOKEN: z.string().min(1).startsWith("re_").optional(),

      // Local SMTP configuration (development)
      SMTP_HOST: z.string().default("localhost"),
      SMTP_PORT: z.coerce.number().default(1025),
      SMTP_USER: z.string().optional(),
      SMTP_PASS: z.string().optional(),
      SMTP_FROM: z.string().email().default("noreply@coordinize.local"),
    },
    runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
      RESEND_FROM: process.env.RESEND_FROM,
      RESEND_TOKEN: process.env.RESEND_TOKEN,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      SMTP_FROM: process.env.SMTP_FROM,
    },
  });
