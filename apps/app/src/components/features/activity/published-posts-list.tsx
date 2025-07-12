'use client';

import type { Post, Space, User } from '@coordinize/database/db';
import { isToday, isYesterday } from 'date-fns';
import { PostItem } from '@/components/features/activity/post-item';
import { DaySeparator } from '@/components/ui/day-seperator';
import { usePublishedPostsQuery } from '@/hooks/use-posts';
import { useCurrentWorkspaceQuery } from '@/hooks/use-workspace';
import { formatDate } from '@/utils/format-date';

type PostWithRelations = Post & {
  space: Pick<Space, 'id' | 'name' | 'identifier'> | null;
  author: Pick<User, 'id' | 'name' | 'image'> | null;
};

export function PublishedPostsList() {
  const { data: publishedPosts } = usePublishedPostsQuery();
  const { data: currentWorkspace } = useCurrentWorkspaceQuery();

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

  const groupedPosts = groupPostsByDate(publishedPosts);

  return (
    <>
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
    </>
  );
}
