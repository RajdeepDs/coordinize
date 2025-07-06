import type { Post, Space, User } from '@coordinize/database/db';
import { isToday, isYesterday } from 'date-fns';
import type { Metadata } from 'next';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { PostItem } from '@/components/features/activity/post-item';
import { AppHeader } from '@/components/layout/app-header';
import { TeamsSidebar } from '@/components/layout/teams-sidebar/teams-sidebar';
import { DaySeparator } from '@/components/ui/day-seperator';
import { getQueryClient, trpc } from '@/trpc/server';
import { formatDate } from '@/utils/format-date';

type PostWithRelations = Post & {
  space: Pick<Space, 'id' | 'name' | 'identifier'> | null;
  author: Pick<User, 'id' | 'name' | 'image'> | null;
};

export const metadata: Metadata = {
  title: 'Home',
};

export default async function Home() {
  const queryClient = getQueryClient();
  const getAllPublishedPosts = await queryClient.fetchQuery(
    trpc.post.getAllPublished.queryOptions()
  );

  const currentWorkspace = await queryClient.fetchQuery(
    trpc.workspace.current.queryOptions()
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

    return formatDate(date);
  }

  function groupPostsByDate(
    posts: PostWithRelations[]
  ): Record<string, PostWithRelations[]> {
    const groups: Record<string, PostWithRelations[]> = {};

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

  return (
    <div className="flex h-full w-full gap-1.5 overflow-hidden">
      <div className="flex-1 rounded border bg-background">
        <AppHeader />
        <ActivitySection>
          {Object.entries(groupedPosts).map(([dateLabel, posts]) => (
            <div className="flex flex-col gap-6" key={dateLabel}>
              <DaySeparator label={dateLabel} />
              <div className="flex flex-col gap-4">
                {posts.map((post) => (
                  <PostItem
                    authorName={post.author?.name || 'Unknown Author'}
                    description={post.content || undefined}
                    id={post.id}
                    key={post.id}
                    spaceName={post.space?.name || 'Unknown Space'}
                    title={post.title}
                    userImage={post.author?.image || undefined}
                    workspaceSlug={currentWorkspace?.slug || ''}
                  />
                ))}
              </div>
            </div>
          ))}
        </ActivitySection>
      </div>
      <TeamsSidebar />
    </div>
  );
}
