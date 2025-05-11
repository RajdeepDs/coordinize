import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";

import { auth } from "@coordinize/auth/auth";
import { database as db } from "@coordinize/database/db";
import { TRPCError, initTRPC } from "@trpc/server";

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    db,
    session,
  };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async (opts) => {
  const { session } = opts.ctx;

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (!session.user.defaultWorkspace) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Default workspace is missing",
    });
  }

  const workspaceId = session.user.defaultWorkspace;

  return opts.next({
    ctx: {
      session,
      workspaceId,
    },
  });
});
