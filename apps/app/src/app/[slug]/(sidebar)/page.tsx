import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import type { Metadata } from 'next';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { PublishedPostsList } from '@/components/features/activity/published-posts-list';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className="flex h-full w-full gap-1.5 overflow-hidden">
      <div className="flex-1 rounded border bg-background">
        <PageHeader
          breadcrumb={[
            {
              label: 'Home',
            },
          ]}
          rightContent={
            <Button
              className={cn('size-7 rounded-sm text-muted-foreground')}
              size={'icon'}
              tooltip="Notifications"
              variant={'ghost'}
            >
              <Icons.bell />
            </Button>
          }
        />

        <ActivitySection>
          <PublishedPostsList />
        </ActivitySection>
      </div>
    </div>
  );
}
