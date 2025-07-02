import { auth } from '@coordinize/auth/auth';
import { database as db } from '@coordinize/database/db';
import { initTRPC, TRPCError } from '@trpc/server';
import { cookies, headers } from 'next/headers';
import { cache } from 'react';
import superjson from 'superjson';

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

export const authenticatedProcedure = t.procedure.use((opts) => {
  const { session } = opts.ctx;

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return opts.next({
    ctx: {
      session,
    },
  });
});

export const protectedProcedure = t.procedure.use(async (opts) => {
  const { session } = opts.ctx;

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const cookieStore = await cookies();
  const workspaceId = cookieStore.get('workspaceId')?.value;

  if (!workspaceId) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'WorkspaceId not found',
    });
  }

  return opts.next({
    ctx: {
      session,
      workspaceId,
    },
  });
});
