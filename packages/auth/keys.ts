import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    server: {
      BETTER_AUTH_SECRET: z.string().min(1),
    },
    client: {
      NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
    },
    runtimeEnv: {
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
      NEXT_PUBLIC_BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    },
  });
