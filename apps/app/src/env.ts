import { keys as auth } from '@coordinize/auth/keys';
import { keys as database } from '@coordinize/database/keys';
import { keys as ratelimit } from '@coordinize/rate-limit/keys';
import { keys as storage } from '@coordinize/storage/keys';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  extends: [database(), auth(), ratelimit(), storage()],
  server: {},
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
    NEXT_PUBLIC_WEB_URL: z.string().min(1).url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
  },
});
