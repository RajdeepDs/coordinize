import { database } from "@coordinize/database/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      onboarded: {
        type: "boolean",
        defaultValue: false,
      },
      defaultWorkspace: {
        type: "string",
        defaultValue: null,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    // TODO: Add `requireEmailVerification`, so the user needs to verify their email before sign in
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Only allow to sign up if the user is on the early access list
      if (ctx.path.startsWith("/sign-up")) {
        const email = ctx.body.email.toLowerCase() as string;

        const res = await database.earlyAccess.findUnique({ where: { email } });

        if (!res?.isEarlyAccess) {
          throw new APIError("FORBIDDEN", {
            message: "You're not on the early access list.",
          });
        }
      }
    }),
  },
  plugins: [nextCookies()],
});
