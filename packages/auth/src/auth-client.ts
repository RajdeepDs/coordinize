import { emailOTPClient, magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { keys } from "../keys";

export const authClient = createAuthClient({
  baseURL: keys().NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [magicLinkClient(), emailOTPClient()],
});

export const { signIn, signUp, useSession } = authClient;
