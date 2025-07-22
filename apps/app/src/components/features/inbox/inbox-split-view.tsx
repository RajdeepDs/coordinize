'use client';

import { useState } from 'react';
import { ScrollableContainer } from '@/components/layout/scrollable-container';
import { InboxHeader } from './inbox-header';
import { InboxList } from './inbox-list';

export function InboxSplitView() {
  const [currentFilter, setCurrentFilter] = useState<
    'all' | 'unread' | 'archived'
  >('all');
  return (
    <div className="flex h-full flex-1 overflow-hidden">
      <div className="flex h-full w-full flex-col bg-background lg:max-w-[600px] lg:basis-[30%] lg:border-r">
        <InboxHeader
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
        />
        <ScrollableContainer>
          <InboxList filter={currentFilter} />
        </ScrollableContainer>
      </div>
    </div>
  );
}
