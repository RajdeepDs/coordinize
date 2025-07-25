import { database } from '@coordinize/database/db';
import { emailService } from '@coordinize/email';
import EmailOTPTemplate from '@coordinize/email/templates/email-otp';
import { MagicLinkTemplate } from '@coordinize/email/templates/magic-link';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP, magicLink } from 'better-auth/plugins';
import React from 'react';
import { keys } from '../keys';

const env = keys();

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
  hooks: {
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
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    nextCookies(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await emailService.send({
          to: email,
          subject: 'Your Magic Link',
          template: React.createElement(MagicLinkTemplate, { url }),
        });
      },
    }),
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        await emailService.send({
          to: email,
          subject: 'Your Verification Code',
          template: React.createElement(EmailOTPTemplate, { loginCode: otp }),
        });
      },
    }),
  ],
});
