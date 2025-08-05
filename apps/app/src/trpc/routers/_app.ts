import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCRouter } from '../init';
import { commentRouter } from './comment';
import { commentReactionRouter } from './comment-reaction';
import { favoriteRouter } from './favorite';
import { inviteRouter } from './invite';
import { notificationRouter } from './notification';
import { postRouter } from './post';
import { reactionRouter } from './reaction';
import { seedRouter } from './seed';
import { spaceRouter } from './space';
import { timelineRouter } from './timeline';
import { userRouter } from './user';
import { workspaceRouter } from './workspace';

export const appRouter = createTRPCRouter({
  user: userRouter,
  workspace: workspaceRouter,
  space: spaceRouter,
  post: postRouter,
  favorite: favoriteRouter,
  timeline: timelineRouter,
  comment: commentRouter,
  commentReaction: commentReactionRouter,
  invite: inviteRouter,
  notification: notificationRouter,
  reaction: reactionRouter,
  seed: seedRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
