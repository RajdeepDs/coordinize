'use client';

import type { Notification } from '@coordinize/database/db';
import Link from 'next/link';
import { ScrollableContainer } from '@/components/layout/scrollable-container';
import { useInboxQuery } from '@/hooks/use-notifications';
import { getInboxItemRoutePath } from '@/utils/get-inbox-route';
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
        <p>Inbox detail view.</p>
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
  return <Link href={getInboxItemRoutePath(item)}>{children}</Link>;
}
