import { database } from "@coordinize/database/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(database, {
    provider: "postgresql",
  }),
  plugins: [nextCookies()],
});
