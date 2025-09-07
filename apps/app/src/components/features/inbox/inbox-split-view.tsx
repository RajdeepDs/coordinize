"use client";

import type { Notification } from "@coordinize/database/db";
import { Icons } from "@coordinize/ui/lib/icons";
import Link from "next/link";
import { useEffect } from "react";
import { ScrollableContainer } from "@/components/layout/scrollable-container";
import { useInboxQuery } from "@/hooks/use-notifications";
import { getInboxItemRoutePath } from "@/utils/get-inbox-route";
import { PostView } from "../post/post-view";
import { InboxProvider, useInboxContext } from "./inbox-context";
import { InboxHeader } from "./inbox-header";
import { NotificationItem } from "./notification-item";

export function InboxSplitView() {
  return (
    <InboxProvider>
      <InboxSplitViewContent />
    </InboxProvider>
  );
}

function InboxSplitViewContent() {
  const { data, isLoading: isNotificationsLoading } = useInboxQuery("all");
  const { selectedNotification, setSelectedNotification } = useInboxContext();

  // Auto-select first notification when data loads
  useEffect(() => {
    if (
      data?.notifications &&
      data.notifications.length > 0 &&
      !selectedNotification
    ) {
      setSelectedNotification(data.notifications[0] || null);
    }
  }, [data?.notifications, selectedNotification, setSelectedNotification]);

  return (
    <div className="flex h-full flex-1 gap-1.5 overflow-hidden">
      <div className="flex h-full w-full flex-col rounded-md border bg-background lg:max-w-md lg:basis-[30%]">
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
      <div className="flex min-w-0 flex-1 flex-col rounded-md border bg-background">
        {selectedNotification ? (
          <PostView postId={selectedNotification.subjectId ?? ""} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <div className="flex size-12 items-center justify-center rounded-full border bg-accent">
              <Icons.inbox />
            </div>
            <p className="select-none text-sm">No unread notifications</p>
          </div>
        )}
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
  const { selectedNotification, setSelectedNotification } = useInboxContext();
  const isSelected = selectedNotification?.id === item.id;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Update URL without reloading the page
    // This will not trigger a full page navigation
    const newpath = getInboxItemRoutePath(item);
    window.history.replaceState({}, "", newpath);

    // Set the selected notification in context
    setSelectedNotification(item);
  };
  return (
    <Link
      className={`w-full cursor-pointer transition-colors ${
        isSelected ? "bg-accent/50" : "hover:bg-accent/20"
      }`}
      href={getInboxItemRoutePath(item)}
      onClick={handleClick}
      replace
    >
      {children}
    </Link>
  );
}
