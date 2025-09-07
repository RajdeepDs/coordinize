import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";
import { createTRPCRouter, protectedProcedure } from "../init";
import {
  createTimelineEventMutation,
  getPostTimelineEventsQuery,
} from "../queries";
import { timelineSchema } from "../schemas/timeline";

export const timelineRouter = createTRPCRouter({
  getPostTimeline: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx: { db } }) => {
      const { postId } = input;

      const post = await db.post.findUnique({
        where: { id: postId },
        select: { id: true, workspaceId: true },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      const timelineEvents = await getPostTimelineEventsQuery(db, postId);
      return timelineEvents;
    }),

  createEvent: protectedProcedure
    .input(timelineSchema)
    .mutation(async ({ input, ctx: { db, session } }) => {
      const {
        action,
        subjectType,
        subjectId,
        referenceType,
        referenceId,
        metadata,
      } = input;

      const timelineEvent = await createTimelineEventMutation(db, {
        actorId: session.user.id,
        actorType: "User",
        subjectType,
        subjectId,
        referenceType,
        referenceId,
        action,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
      });

      return timelineEvent;
    }),
});
