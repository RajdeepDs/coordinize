'use client';

import AvatarStatus from '@/components/ui/avatar-status';
import { usePostTimelineQuery } from '@/hooks/use-timeline';
import type {
  CommentTimelineEvent,
  ProcessedTimelineEvent,
} from '@/lib/queries';
import { formatDate } from '@/utils/format-date';
import { CommentItem } from '../timeline/comment-item';

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
    <div className="relative space-y-5">
      <div className="absolute top-0 left-6 z-0 h-full w-px bg-ui-gray-400" />
      {events.map((event) => (
        <div className="relative z-10 bg-white" key={event.id}>
          {isCommentEvent(event) ? (
            <CommentItem comment={event.comment} />
          ) : (
            <div className="pl-3">
              <div className="flex items-center gap-2">
                <AvatarStatus
                  alt="author-image"
                  className="size-6"
                  fallback={event?.actor?.name.at(0)}
                  src={event?.actor?.image ?? ''}
                />
                <p className="font-medium text-sm">{event?.actor?.name}</p>
                <p>{event.action}</p>
                <span className="text-sm text-ui-gray-900">
                  {formatDate(event.createdAt)}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
