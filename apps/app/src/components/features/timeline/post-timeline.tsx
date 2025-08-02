'use client';

import { usePostTimelineQuery } from '@/hooks/use-timeline';
import type {
  CommentTimelineEvent,
  ProcessedTimelineEvent,
} from '@/lib/queries';
import { CommentItem } from './comment-item';
import { PostEventItem } from './post-event-item';

function isCommentEvent(
  event: ProcessedTimelineEvent
): event is CommentTimelineEvent {
  return event.action === 'COMMENTED' && 'comment' in event;
}

export function PostTimeline({ postId }: { postId: string }) {
  const { data: events } = usePostTimelineQuery(postId);

  if (!events || events.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">No activity yet.</div>
    );
  }

  return (
    <div className="relative space-y-3">
      <div className="absolute top-0 left-6 z-0 h-full w-px bg-ui-gray-400" />
      {events.map((event) => (
        <div className="relative z-10 bg-white" key={event.id}>
          {isCommentEvent(event) ? (
            <CommentItem comment={event.comment} />
          ) : (
            <PostEventItem event={event} />
          )}
        </div>
      ))}
    </div>
  );
}
