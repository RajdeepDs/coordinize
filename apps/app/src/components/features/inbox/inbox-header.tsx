'use client';

import { Label } from '@coordinize/ui/components/label';
import { useNotificationCounts } from '@/hooks/use-notifications';
import { InboxFilter } from './inbox-filter';

interface InboxHeaderProps {
  currentFilter: 'all' | 'unread' | 'archived';
  onFilterChange: (filter: 'all' | 'unread' | 'archived') => void;
}

export function InboxHeader({
  currentFilter,
  onFilterChange,
}: InboxHeaderProps) {
  const { data: counts } = useNotificationCounts();

  const getFilterLabel = () => {
    switch (currentFilter) {
      case 'unread':
        return `Inbox (${counts?.unreadCount ?? 0})`;
      case 'archived':
        return `Archived (${counts?.archivedCount ?? 0})`;
      default:
        return 'Inbox';
    }
  };

  return (
    <div className="flex min-h-10 items-center justify-between pr-4 pl-3">
      <Label className="font-normal text-foreground text-sm">
        {getFilterLabel()}
      </Label>
      <InboxFilter
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}
