import { keys as auth } from "@coordinize/auth/keys";
import { keys as database } from "@coordinize/database/keys";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  extends: [database(), auth()],
  server: {},
  client: {},
  runtimeEnv: {},
});
