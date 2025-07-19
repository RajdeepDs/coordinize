import { auth } from '@coordinize/auth/auth';
import { database as db } from '@coordinize/database/db';
import { createRateLimiter, slidingWindow } from '@coordinize/rate-limit';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
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

const rateLimiter = createRateLimiter({
  limiter: slidingWindow(5, '60s'),
});

export const rateLimitedProcedure = t.procedure.use(async ({ next }) => {
  const headersList = await headers();
  const ip =
    headersList.get('x-forwarded-for') ||
    headersList.get('x-real-ip') ||
    'unknown';

  const { success, remaining } = await rateLimiter.limit(`waitlist:${ip}`);

  if (!success) {
    throw new TRPCError({
      code: 'TOO_MANY_REQUESTS',
      message: 'Rate limit exceeded. Please try again later.',
    });
  }

  return next({
    ctx: {
      ratelimit: {
        remaining,
      },
    },
  });
});
