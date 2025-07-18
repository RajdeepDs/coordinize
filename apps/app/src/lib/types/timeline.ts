import type { TimelineAction, TimelineEvent } from '@coordinize/database/db';

export interface TimelineEventDisplay {
  id: string;
  action: TimelineAction;
  message: string;
  time: Date;
  actor: {
    id: string;
    name: string;
    image: string | null;
  } | null;
  metadata?: Record<string, unknown>;
}

export const TimelineEventMessages: Record<
  TimelineAction,
  (event: TimelineEvent) => string
> = {
  UPDATED_TITLE: (event) => {
    const metadata = event.metadata as {
      oldTitle?: string;
      newTitle?: string;
    } | null;
    return `changed the title from "${metadata?.oldTitle}" to "${metadata?.newTitle}"`;
  },
  MOVED_SPACE: () => 'moved this post to another space',
  RESOLVED: () => 'marked this post as resolved',
  REOPENED: () => 'reopened this post',
  COMMENTED: () => 'commented on this post',
};
