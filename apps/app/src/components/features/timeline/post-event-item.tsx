"use client";

import type { ProcessedTimelineEvent } from "@coordinize/api/queries";
import type { TimelineEvent } from "@coordinize/database/db";
import { Icons } from "@coordinize/ui/lib/icons";
import AvatarStatus from "@/components/ui/avatar-status";
import { TimelineEventMessages } from "@/lib/types/timeline";
import { formatDate } from "@/utils/format-date";

type PostEventItemProps = {
  event: ProcessedTimelineEvent;
};

// Type-safe function to get timeline event message
const getTimelineMessage = (processedEvent: ProcessedTimelineEvent): string => {
  const getMessage = TimelineEventMessages[processedEvent.action];

  const eventForMessage = {
    id: processedEvent.id,
    action: processedEvent.action,
    metadata: processedEvent.metadata as Record<string, unknown> | null,
    createdAt: processedEvent.createdAt,
    updatedAt: processedEvent.updatedAt,
  };

  return getMessage(eventForMessage as TimelineEvent);
};

export function PostEventItem({ event }: PostEventItemProps) {
  const getIcon = () => {
    switch (event.action) {
      case "RESOLVED":
      case "REOPENED":
        return <Icons.post className="text-ui-gray-900" size={16} />;
      case "UPDATED_TITLE":
        return <Icons.pen className="text-ui-gray-900" size={16} />;
      case "MOVED_SPACE":
        return <Icons.space className="text-ui-gray-900" size={16} />;
      default:
        return (
          <AvatarStatus
            alt="user-avatar"
            className="size-6"
            fallback={event.actor?.name?.charAt(0) || "?"}
            src={event.actor?.image || ""}
            statusShow={false}
          />
        );
    }
  };

  const message = getTimelineMessage(event);

  return (
    <div className="select-none pl-3">
      <div className="flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-full bg-ui-gray-400">
          {getIcon()}
        </div>
        <p className="font-medium text-sm">{event?.actor?.name}</p>
        <p className="text-sm text-ui-gray-900">{message}</p>
        <span className="inline-block size-[3px] rounded-full bg-ui-gray-700 align-middle" />
        <span className="text-sm text-ui-gray-900">
          {formatDate(event.createdAt)}
        </span>
      </div>
    </div>
  );
}
