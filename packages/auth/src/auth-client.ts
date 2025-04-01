import { createAuthClient } from "better-auth/react";
import { keys } from "../keys";

export const authClient = createAuthClient({
  baseURL: keys().NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signUp, useSession } = createAuthClient();
