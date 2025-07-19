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
import { CommentItem } from '@/components/features/comments/comment-item';
import AvatarStatus from '@/components/ui/avatar-status';
import { usePostTimelineQuery } from '@/hooks/use-timeline';
import {
  type EventWithComment,
  TimelineEventMessages,
} from '@/lib/types/timeline';
import { formatDate } from '@/utils/format-date';

export function PostTimeline({ postId }: { postId: string }) {
  const { data: events } = usePostTimelineQuery(postId);

  if (!events || events.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">No activity yet.</div>
    );
  }

  return (
    <div className="space-y-4">
      <Timeline>
        {events
          .filter(
            (
              timelineEvent
            ): timelineEvent is NonNullable<typeof timelineEvent> =>
              timelineEvent !== null
          )
          .map((event, index) => {
            const getMessage = TimelineEventMessages[event.action];
            const message = getMessage(event as unknown as TimelineEvent);
            const eventWithComment = event as unknown as EventWithComment;

            const getIcon = () => {
              switch (event.action) {
                case 'RESOLVED':
                case 'REOPENED':
                  return (
                    <Icons.post className="text-muted-foreground" size={16} />
                  );
                case 'UPDATED_TITLE':
                  return (
                    <Icons.pen className="text-muted-foreground" size={16} />
                  );
                case 'MOVED_SPACE':
                  return (
                    <Icons.space className="text-muted-foreground" size={16} />
                  );
                case 'COMMENTED': {
                  return (
                    <AvatarStatus
                      alt="comment-author-avatar"
                      className="size-6"
                      fallback={
                        eventWithComment.comment?.author?.name?.charAt(0) || '?'
                      }
                      src={eventWithComment.comment?.author?.image || ''}
                      statusShow={false}
                    />
                  );
                }
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

            const renderContent = () => {
              if (event.action === 'COMMENTED' && eventWithComment.comment) {
                return (
                  <CommentItem
                    comment={{
                      id: eventWithComment.comment.id,
                      content: eventWithComment.comment.content,
                      createdAt: eventWithComment.comment.createdAt,
                      updatedAt: eventWithComment.comment.updatedAt,
                      edited: eventWithComment.comment.edited,
                      authorId: eventWithComment.comment.authorId,
                      postId: eventWithComment.comment.postId,
                      parentId: eventWithComment.comment.parentId,
                      author: {
                        id: eventWithComment.comment.author.id,
                        name: eventWithComment.comment.author.name,
                        image: eventWithComment.comment.author.image,
                      },
                      replies: eventWithComment.comment.replies || [],
                    }}
                    currentUserId={undefined}
                    depth={0}
                  />
                );
              }

              return (
                <div className="-ms-1 space-x-0.5 text-balance">
                  <span className="font-medium text-foreground">
                    {event.actor?.name || ''}
                  </span>{' '}
                  <span>{message}</span>{' '}
                  <span className="inline-block size-[3px] rounded-full bg-ui-gray-700 align-middle" />{' '}
                  <span>{formatDate(eventWithComment.createdAt)}</span>
                </div>
              );
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
                <TimelineContent>{renderContent()}</TimelineContent>
              </TimelineItem>
            );
          })}
      </Timeline>
    </div>
  );
}
