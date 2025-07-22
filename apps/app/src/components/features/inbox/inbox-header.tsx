'use client';

import { Label } from '@coordinize/ui/components/label';
import { Separator } from '@coordinize/ui/components/separator';
import { SidebarTrigger, useSidebar } from '@coordinize/ui/components/sidebar';

interface _InboxHeaderProps {
  currentFilter: 'all' | 'unread' | 'archived';
  onFilterChange: (filter: 'all' | 'unread' | 'archived') => void;
}

export function InboxHeader() {
  const { isMobile, leftState } = useSidebar();

  return (
    <div className="flex min-h-10 items-center justify-between pr-4 pl-3">
      <div className="flex items-center gap-3">
        {(isMobile || leftState === 'collapsed') && (
          <div className="flex shrink-0 items-center gap-1.5">
            <SidebarTrigger className="size-7 rounded-sm text-muted-foreground" />
            <Separator className="min-h-4" orientation="vertical" />
          </div>
        )}
        <Label className="font-normal text-foreground text-sm">Inbox</Label>
      </div>
      {/* <InboxFilter
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
      /> */}
    </div>
  );
}
