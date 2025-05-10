import { getWorkspaceQuery } from "@/queries";
import { auth } from "@coordinize/auth/auth";
import { database as db } from "@coordinize/database/db";
import { TRPCError, initTRPC } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const workspace = await getWorkspaceQuery(session?.user.defaultWorkspace);

  if (!workspace) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }

  return {
    db,
    session,
    workspaceId: workspace.id,
  };
});

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async (opts) => {
  const { workspaceId, session } = opts.ctx;

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      session,
      workspaceId,
    },
  });
});
