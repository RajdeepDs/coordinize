import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCRouter } from '../init';
import { commentRouter } from './comment';
import { favoriteRouter } from './favorite';
import { inviteRouter } from './invite';
import { notificationRouter } from './notification';
import { onboardingRouter } from './onboarding';
import { postRouter } from './post';
import { spaceRouter } from './space';
import { timelineRouter } from './timeline';
import { userRouter } from './user';
import { workspaceRouter } from './workspace';

export const appRouter = createTRPCRouter({
  onboarding: onboardingRouter,
  user: userRouter,
  workspace: workspaceRouter,
  space: spaceRouter,
  post: postRouter,
  favorite: favoriteRouter,
  timeline: timelineRouter,
  comment: commentRouter,
  invite: inviteRouter,
  notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
