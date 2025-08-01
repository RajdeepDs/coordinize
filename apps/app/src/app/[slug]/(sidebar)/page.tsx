import type { Metadata } from 'next';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { PublishedPostsList } from '@/components/features/activity/published-posts-list';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden rounded-md border bg-background">
      <PageHeader
        breadcrumb={[
          {
            label: 'Home',
          },
        ]}
      />
      <div className="flex-1 overflow-hidden">
        <ActivitySection>
          <PublishedPostsList />
        </ActivitySection>
      </div>
    </div>
  );
}
