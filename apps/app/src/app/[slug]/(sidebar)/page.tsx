import type { Post } from '@coordinize/database/db';
import { Label } from '@coordinize/ui/components/label';
import { Separator } from '@coordinize/ui/components/separator';
import { isThisWeek, isToday, isYesterday } from 'date-fns';
import type { Metadata } from 'next';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { AppHeader } from '@/components/layout/app-header';
import { TeamsSidebar } from '@/components/layout/teams-sidebar/teams-sidebar';
import { getQueryClient, trpc } from '@/trpc/server';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Home() {
  const queryClient = getQueryClient();
  const getAllPublishedPosts = await queryClient.fetchQuery(
    trpc.post.getAllPublished.queryOptions()
  );

  function getDateLabel(publishedAt: Date | null): string {
    if (!publishedAt) {
      return 'Older';
    }

    const date = new Date(publishedAt);

    if (isToday(date)) {
      return 'Today';
    }
    if (isYesterday(date)) {
      return 'Yesterday';
    }
    if (isThisWeek(date)) {
      return 'This Week';
    }

    return 'Older';
  }

  function groupPostsByDate(posts: Post[]) {
    const groups: Record<string, typeof posts> = {};

    for (const post of posts) {
      if (!post.publishedAt) {
        continue;
      }

      const label = getDateLabel(post.publishedAt);

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label]?.push(post);
    }

    return groups;
  }
  const groupedPosts = groupPostsByDate(getAllPublishedPosts);

  console.log({ groupedPosts });

  return (
    <div className="flex h-full w-full gap-1.5 overflow-hidden">
      <div className="flex-1 rounded border bg-background">
        <AppHeader />
        <ActivitySection>
          {/* Day separator */}
          <div className="flex w-full items-center gap-2">
            <Label className="font-normal text-muted-foreground">Today</Label>
            <Separator className="flex-1 data-[orientation=horizontal]:w-full" />
          </div>
          {/* List of posts */}
          {/* The post contains - post created user image, title, latest comment and space label */}
        </ActivitySection>
      </div>
      <TeamsSidebar />
    </div>
  );
}
