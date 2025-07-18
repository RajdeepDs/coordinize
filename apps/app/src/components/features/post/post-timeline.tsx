'use client';

import type { TimelineEvent } from '@coordinize/database/db';
import { Icons } from '@coordinize/ui/lib/icons';
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from '@coordinize/ui/timeline';
import AvatarStatus from '@/components/ui/avatar-status';
import { usePostTimelineQuery } from '@/hooks/use-timeline';
import { TimelineEventMessages } from '@/lib/types/timeline';
import { formatDate } from '@/utils/format-date';

export function PostTimeline({ postId }: { postId: string }) {
  const { data: events } = usePostTimelineQuery(postId);

  if (!events || events.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">No activity yet.</div>
    );
  }
  return (
    <Timeline>
      {events.map((event, index) => {
        const getMessage = TimelineEventMessages[event.action];
        const message = getMessage(event as TimelineEvent);

        const getIcon = () => {
          switch (event.action) {
            case 'RESOLVED':
            case 'REOPENED':
              return <Icons.post className="text-muted-foreground" size={16} />;
            case 'UPDATED_TITLE':
              return <Icons.pen className="text-muted-foreground" size={16} />;
            case 'MOVED_SPACE':
              return (
                <Icons.space className="text-muted-foreground" size={16} />
              );

            default:
              return (
                <AvatarStatus
                  alt="user-avatar"
                  className="size-6"
                  fallback={event.actor?.name?.charAt(0) || '?'}
                  src={event.actor?.image || ''}
                  statusShow={false}
                />
              );
          }
        };
        return (
          <TimelineItem
            className="group-data-[orientation=vertical]/timeline:ms-10.5 group-data-[orientation=vertical]/timeline:not-last:pb-5"
            key={event.id}
            step={index + 1}
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <TimelineIndicator className="group-data-[orientation=vertical]/timeline:-left-7 flex size-6 items-center justify-center border-none bg-accent">
                {getIcon()}
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="-ms-1 space-x-0.5 text-balance">
              <span className="font-medium text-foreground">
                {event.actor?.name || ''}
              </span>{' '}
              <span>{message}</span>{' '}
              <span className="inline-block size-[3px] rounded-full bg-ui-gray-700 align-middle" />{' '}
              <span>{formatDate(event.createdAt)}</span>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
