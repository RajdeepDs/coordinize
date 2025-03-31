import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";

import { auth } from "@coordinize/auth/auth";
import { database } from "@coordinize/database/db";
import { createRateLimiter, slidingWindow } from "@coordinize/rate-limit";

const rateLimiter = createRateLimiter({
  limiter: slidingWindow(10, "10s"),
});

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const actionClientWithMeta = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      if (e.message === "Too many requests") {
        return "Rate limit exceeded. Please try again later.";
      }
      if (e.message === "Unauthorized") {
        return "You must be logged in to perform this action.";
      }
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },

  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    });
  },
});

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: {} });

    if (process.env.NODE_ENV === "development") {
      console.log("Input ->", clientInput);
      console.log("Result ->", result.data);
      console.log("Metadata ->", metadata);

      return result;
    }

    return result;
  })
  .use(async ({ next, metadata }) => {
    const ip = (await headers()).get("x-forwarded-for");

    const { success, remaining } = await rateLimiter.limit(
      `${ip}-${metadata.name}`,
    );

    if (!success) {
      throw new Error("Too many requests");
    }

    return next({
      ctx: {
        ratelimit: {
          remaining,
        },
      },
    });
  })
  .use(async ({ next }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    return next({
      ctx: {
        user: session.user,
        db: database,
      },
    });
  });
