'use client';

import { useInboxQuery } from '@/hooks/use-notifications';
import { InboxItem } from './inbox-item';

interface InboxListProps {
  filter: 'all' | 'unread' | 'archived';
}

export function InboxList({ filter }: InboxListProps) {
  const { data, isLoading, error } = useInboxQuery(filter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground text-sm">
          Loading notifications...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-destructive text-sm">
          Failed to load notifications
        </div>
      </div>
    );
  }

  if (!data?.notifications || data.notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-muted-foreground text-sm">
          {filter === 'unread' && 'No unread notifications'}
          {filter === 'archived' && 'No archived notifications'}
          {filter === 'all' && 'No notifications yet'}
        </div>
        {filter === 'all' && (
          <div className="mt-2 text-muted-foreground text-xs">
            You'll see notifications about comments, mentions, and updates here.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {data.notifications.map((notification) => (
        <InboxItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
