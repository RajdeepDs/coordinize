import { database } from '@coordinize/database/db';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      onboarded: {
        type: 'boolean',
        defaultValue: false,
      },
      defaultWorkspace: {
        type: 'string',
        defaultValue: null,
      },
      onboardingStep: {
        type: 'string',
        defaultValue: 'WELCOME',
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
      if (ctx.path.startsWith('/sign-up')) {
        const email = ctx.body.email.toLowerCase() as string;

        const res = await database.earlyAccess.findUnique({ where: { email } });

        if (!res?.isEarlyAccess) {
          throw new APIError('FORBIDDEN', {
            message: "You're not on the early access list.",
          });
        }
      }
    }),
    after: createAuthMiddleware(async (ctx) => {
      // If the user is signing in, set the workspaceId cookie if the user has a default workspace
      if (ctx.path.startsWith('/sign-in')) {
        const user = ctx.context.newSession?.user;

        if (!user) {
          return;
        }

        const isOnboarded = user.onboarded ?? false;
        const defaultWorkspaceSlug = user.defaultWorkspace;

        if (!(isOnboarded && defaultWorkspaceSlug)) {
          return;
        }

        try {
          const workspace = await database.workspace.findUnique({
            where: { slug: defaultWorkspaceSlug },
            select: { id: true },
          });

          if (!workspace?.id) {
            throw new APIError('NOT_FOUND', {
              message: `Default workspace '${defaultWorkspaceSlug}' not found`,
            });
          }

          // Set the workspaceId cookie for future requests
          ctx.setCookie('workspaceId', workspace.id, {
            secure: true,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });
        } catch {
          throw new APIError('INTERNAL_SERVER_ERROR', {
            message: 'Failed to set workspaceId cookie',
          });
        }
      }
    }),
  },
  plugins: [nextCookies()],
});
