import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCRouter } from '../init';
import { authRouter } from './auth';
import { onboardingRouter } from './onboarding';
import { postRouter } from './post';
import { spaceRouter } from './space';
import { userRouter } from './user';
import { workspaceRouter } from './workspace';

export const appRouter = createTRPCRouter({
  onboarding: onboardingRouter,
  auth: authRouter,
  user: userRouter,
  workspace: workspaceRouter,
  space: spaceRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
