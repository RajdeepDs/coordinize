import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      UPLOADTHING_TOKEN: z.string().min(1).optional(),
    },
    runtimeEnv: {
      UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    },
  });
