'use client';

import { useState } from 'react';

import { InboxHeader } from '@/components/features/inbox/inbox-header';
import { InboxList } from '@/components/features/inbox/inbox-list';

export function InboxSidebar() {
  const [currentFilter, setCurrentFilter] = useState<
    'all' | 'unread' | 'archived'
  >('all');
  return (
    <div className="w-[24rem] space-y-2 rounded border bg-background">
      <InboxHeader
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      <div className="h-[calc(100vh-8rem)] overflow-y-auto">
        <InboxList filter={currentFilter} />
      </div>
    </div>
  );
}
