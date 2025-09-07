"use client";

import type {
  CommentTimelineEvent,
  ProcessedTimelineEvent,
} from "@coordinize/api/queries";
import { Icons } from "@coordinize/ui/lib/icons";
import { CommentWrapper } from "@/components/features/timeline/comment-item";
import { PostEventItem } from "@/components/features/timeline/post-event-item";
import { usePostTimelineQuery } from "@/hooks/use-timeline";

function isCommentEvent(
  event: ProcessedTimelineEvent
): event is CommentTimelineEvent {
  return event.action === "COMMENTED" && "comment" in event;
}

export function PostTimeline({ postId }: { postId: string }) {
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = usePostTimelineQuery(postId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-8">
        <Icons.loader className="size-4 animate-spin text-ui-gray-600" />
        <span className="text-sm text-ui-gray-600">Loading timeline...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-ui-red-500" />
          <span className="font-medium text-sm text-ui-red-800">
            Failed to load timeline
          </span>
        </div>
        <p className="mt-1 text-sm text-ui-red-600">
          {error?.message || "Something went wrong while loading the timeline."}
        </p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">No activity yet.</div>
    );
  }

  return (
    <div className="relative space-y-3">
      <div className="absolute top-0 left-6 z-0 h-full w-px bg-ui-gray-400" />
      {events.map((event) => (
        <div className="relative bg-background" key={event.id}>
          {isCommentEvent(event) ? (
            <CommentWrapper comment={event.comment} />
          ) : (
            <PostEventItem event={event} />
          )}
        </div>
      ))}
    </div>
  );
}
