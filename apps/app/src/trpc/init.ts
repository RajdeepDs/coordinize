import { cookies, headers } from "next/headers";
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

  const cookieStore = await cookies();
  let workspaceId = cookieStore.get("workspaceId")?.value;

  if (!workspaceId && session.user.defaultWorkspace) {
    // Find workspace based on user's default workspace
    const workspace = await opts.ctx.db.workspace.findUnique({
      where: { slug: session.user.defaultWorkspace },
      select: { id: true },
    });

    if (workspace) {
      workspaceId = workspace.id;
      // Set workspace cookie for future requests
      cookieStore.set({
        name: "workspaceId",
        value: workspace.id,
        secure: true,
        httpOnly: true,
      });
    }
  }

  if (!workspaceId) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "WorkspaceId not found",
    });
  }

  return opts.next({
    ctx: {
      session,
      workspaceId,
    },
  });
});
