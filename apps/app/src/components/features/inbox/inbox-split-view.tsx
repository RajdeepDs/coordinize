'use client';

import type { Notification } from '@coordinize/database/db';
import { Icons } from '@coordinize/ui/lib/icons';
import Link from 'next/link';
import { ScrollableContainer } from '@/components/layout/scrollable-container';
import { useInboxQuery } from '@/hooks/use-notifications';
import { getInboxItemRoutePath } from '@/utils/get-inbox-route';
import { PostView } from '../post/post-view';
import { InboxHeader } from './inbox-header';
import { NotificationItem } from './notification-item';

export function InboxSplitView() {
  const { data, isLoading: isNotificationsLoading } = useInboxQuery('all');

  return (
    <div className="flex h-full flex-1 gap-1 overflow-hidden">
      <div className="flex h-full w-full flex-col rounded border bg-background lg:max-w-md lg:basis-[30%]">
        <InboxHeader />
        <ScrollableContainer>
          {isNotificationsLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Loading notifications...</p>
            </div>
          ) : null}
          <InboxNotifications notifications={data?.notifications || []} />
        </ScrollableContainer>
      </div>
      <div className="flex min-w-0 flex-1 flex-col rounded border bg-background">
        <div className="hidden h-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <div className="flex size-12 items-center justify-center rounded-full border bg-accent">
            <Icons.inbox />
          </div>
          <p className="select-none text-sm">No unread notifications</p>
        </div>
        <PostView postId={data?.notifications[0]?.subjectId ?? ''} />
      </div>
    </div>
  );
}

export function InboxNotifications({
  notifications,
}: {
  notifications: (Notification & { workspace: { slug: string } })[];
}) {
  return (
    <div>
      {notifications.map((notification) => (
        <InboxItem item={notification} key={notification.id}>
          <NotificationItem notification={notification} />
        </InboxItem>
      ))}
    </div>
  );
}

export function InboxItem({
  children,
  item,
}: {
  children: React.ReactNode;
  item: Notification & { workspace: { slug: string } };
}) {
  return (
    <Link
      href={getInboxItemRoutePath(item)}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </Link>
  );
}
