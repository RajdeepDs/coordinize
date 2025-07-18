'use client';

import type { TimelineEvent } from '@coordinize/database/db';
import { Label } from '@coordinize/ui/components/label';
import { Suspense } from 'react';
import AvatarStatus from '@/components/ui/avatar-status';
import { Dot } from '@/components/ui/dot';
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
          <div className="flex gap-2" key={event.id}>
            <div className="flex-shrink-0">
              <AvatarStatus
                alt="user-avatar"
                className="size-6"
                fallback={event.actor?.name?.charAt(0) || '?'}
                src={event.actor?.image || ''}
                statusShow={false}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-ui-gray-900">
              <span className="font-medium text-primary">
                {event.actor?.name || ''}
              </span>
              <span>{message}</span>
              <Dot className="size-1" />
              <span>{formatDate(event.createdAt)}</span>
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
