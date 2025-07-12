import type { Metadata } from 'next';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { PublishedPostsList } from '@/components/features/activity/published-posts-list';
import { AppHeader } from '@/components/layout/app-header';
import { TeamsSidebar } from '@/components/layout/teams-sidebar/teams-sidebar';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className="flex h-full w-full gap-1.5 overflow-hidden">
      <div className="flex-1 rounded border bg-background">
        <AppHeader />
        <ActivitySection>
          <PublishedPostsList />
        </ActivitySection>
      </div>
      <TeamsSidebar />
    </div>
  );
}
