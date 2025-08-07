'use client';

import type { Post, User } from '@coordinize/database/db';
import { isToday, isYesterday } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { PostItem } from '@/components/features/activity/post-item';
import { PostSeparator } from '@/components/ui/post-separator';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-post-navigation';
import { useSpaceWithPublishedPostsQuery } from '@/hooks/use-space';
import { formatDate } from '@/utils/format-date';

type PostWithRelations = Post & {
  author: Pick<User, 'id' | 'name' | 'image'> | null;
};

export function SpacePublishedPostsList({
  identifier,
}: {
  identifier: string;
}) {
  const { data: space } = useSpaceWithPublishedPostsQuery(identifier);
  const { slug: workspaceSlug } = useParams<{ slug: string }>();

  const router = useRouter();

  // Flatten posts for navigation
  const flatPosts = space?.posts || [];

  // Keyboard navigation
  const { selectedIndex, selectedRef } = useKeyboardNavigation(
    flatPosts,
    (post) => {
      router.push(
        `/workspace/${workspaceSlug}/space/${identifier}/post/${post.id}`
      );
    }
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

    const pinnedPosts: PostWithRelations[] = [];
    const unpinnedPosts: PostWithRelations[] = [];

    for (const post of posts) {
      if (!post.publishedAt) {
        continue;
      }

      if (post.pinned) {
        pinnedPosts.push(post);
      } else {
        unpinnedPosts.push(post);
      }
    }

    // Add pinned posts group if there are any pinned posts
    if (pinnedPosts.length > 0) {
      groups.Pinned = pinnedPosts;
    }

    // Group unpinned posts by date
    for (const post of unpinnedPosts) {
      const label = getDateLabel(post.publishedAt);

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label]?.push(post);
    }

    return groups;
  }

  const groupedPosts = groupPostsByDate(space?.posts || []);

  return (
    <>
      {Object.entries(groupedPosts).map(([dateLabel, posts]) => (
        <div className="flex flex-col gap-6" key={dateLabel}>
          <PostSeparator label={dateLabel} />
          <div className="flex flex-col gap-4">
            {posts.map((post) => {
              // Find the index of this post in the flat array
              const postIndex = flatPosts.findIndex((p) => p.id === post.id);
              const isSelected =
                selectedIndex !== null && postIndex === selectedIndex;

              return (
                <div
                  className={`rounded-md transition-colors ${
                    isSelected ? 'bg-accent' : ''
                  }`}
                  key={post.id}
                  ref={isSelected ? selectedRef : null}
                >
                  <PostItem
                    authorName={post.author?.name || ''}
                    description={post.content || undefined}
                    id={post.id}
                    spaceName={space?.name || ''}
                    title={post.title}
                    userImage={post.author?.image || undefined}
                    workspaceSlug={workspaceSlug || ''}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
