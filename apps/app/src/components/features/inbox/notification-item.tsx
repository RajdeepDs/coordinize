"use client";

import type { Notification, User } from "@coordinize/database/db";
import { Icons } from "@coordinize/ui/lib/icons";
import AvatarStatus from "@/components/ui/avatar-status";
import { formatDate } from "@/utils/format-date";

type NotificationItemProps = {
  notification: Notification & {
    actor?: User;
  };
};

export function NotificationItem({ notification }: NotificationItemProps) {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case "POST_COMMENT":
        return Icons.megaphone;
      case "POST_MENTION":
        return Icons.megaphone;
      case "POST_UPDATE":
        return Icons.pen;
      case "POST_RESOLVED":
        return Icons.resolve;
      case "POST_REOPENED":
        return Icons.circleX;
      default:
        return Icons.bell;
    }
  };

  const NotificationIcon = getNotificationIcon();

  return (
    <div className="flex cursor-pointer select-none px-1">
      <div className="flex h-[55px] w-full items-center gap-2 rounded-sm p-2 transition-colors duration-150 ease-linear hover:bg-ui-gray-100">
        {notification.actor ? (
          <AvatarStatus
            alt="User Avatar"
            className="size-8"
            fallback={notification.actor?.name.charAt(0) ?? ""}
            src={notification.actor?.image ?? ""}
            statusShow={false}
          />
        ) : (
          <div className="flex size-8 items-center justify-center rounded-full bg-ui-gray-200">
            <NotificationIcon className="size-4 text-ui-gray-700" />
          </div>
        )}
        <div className="flex flex-1 flex-col overflow-hidden">
          <p className="text-sm">{notification.title}</p>
          <span className="truncate text-sm text-ui-gray-900">
            {notification.message}
          </span>
        </div>
        <div className="flex h-full flex-col justify-end">
          <span className="text-sm text-ui-gray-800">
            {formatDate(notification.createdAt).split(" ago")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
