import { database } from "@coordinize/database/db";
import { emailService } from "@coordinize/email";
import EmailOTPTemplate from "@coordinize/email/templates/email-otp";
import { MagicLinkTemplate } from "@coordinize/email/templates/magic-link";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, magicLink } from "better-auth/plugins";
import React from "react";
import { keys } from "../keys";

const env = keys();

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
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      mapProfileToUser: (profile) => {
        return {
          name: profile.name,
          image: profile.picture,
        };
      },
    },
  },
  plugins: [
    nextCookies(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await emailService.send({
          to: email,
          subject: "Your Magic Link",
          template: React.createElement(MagicLinkTemplate, { url }),
        });
      },
    }),
    emailOTP({
      sendVerificationOTP: async ({ email, otp }) => {
        await emailService.send({
          to: email,
          subject: "Your Verification Code",
          template: React.createElement(EmailOTPTemplate, { loginCode: otp }),
        });
      },
    }),
  ],
});
