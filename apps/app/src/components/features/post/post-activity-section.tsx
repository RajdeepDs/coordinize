'use client';

import type { TimelineEvent } from '@coordinize/database/db';
import { Label } from '@coordinize/ui/components/label';
import { Suspense } from 'react';
import { usePostTimelineQuery } from '@/hooks/use-timeline';
import { TimelineEventMessages } from '@/lib/types/timeline';
import { formatDate } from '@/utils/format-date';

interface PostActivitySectionProps {
  postId: string;
}

function TimelineContent({ postId }: { postId: string }) {
  const { data: events } = usePostTimelineQuery(postId);

  if (!events || events.length === 0) {
    return <div className="text-muted-foreground text-sm">No activity yet</div>;
  }

  return (
    <div className="space-y-4">
      {events.map((event) => {
        const getMessage = TimelineEventMessages[event.action];
        const message = getMessage(event as TimelineEvent);

        return (
          <div className="flex gap-3" key={event.id}>
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                {event.actor?.name?.charAt(0) || '?'}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm">
                <span className="font-medium text-foreground">
                  {event.actor?.name || 'Unknown user'}
                </span>{' '}
                <span className="text-muted-foreground">{message}</span>
              </div>
              <div className="mt-1 text-muted-foreground text-xs">
                {formatDate(event.createdAt)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="text-muted-foreground text-sm">Loading activity...</div>
  );
}

export function PostActivitySection({ postId }: PostActivitySectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <Label>Activity</Label>
      <Suspense fallback={<LoadingFallback />}>
        <TimelineContent postId={postId} />
      </Suspense>
    </div>
  );
}
