'use client';

import { Button } from '@coordinize/ui/components/button';
import { LayeredHotkeys } from '@coordinize/ui/components/layered-hotkeys';
import { Separator } from '@coordinize/ui/components/separator';
import { Sidebar, SidebarContent } from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { useParams } from 'next/navigation';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { EditablePostContent } from '@/components/features/post/editable-post-content';
import { EmojiReactions } from '@/components/features/post/emoji-reactions';
import { PostActivitySection } from '@/components/features/post/post-activity-section';
import { PostMetadata } from '@/components/features/post/post-metadata';
import { PostOptions } from '@/components/features/post/post-options';
import { PostSidebar } from '@/components/features/post/post-sidebar';
import { ResolvedPostLabel } from '@/components/features/post/resolved-post-label';
import { PageHeader } from '@/components/layout/page-header';
import { usePostByIdQuery } from '@/hooks/use-posts';
import { useToggleFavorite } from '@/hooks/use-toggle-favorite';

interface PostPageContentProps {
  postId: string;
}

export function PostPageContent({ postId }: PostPageContentProps) {
  const { slug } = useParams<{ slug: string }>();
  const { data: post } = usePostByIdQuery(postId);
  const { mutate: toggleFavorite } = useToggleFavorite();

  const isFavorited = post?.favorite && post.favorite.length > 0;

  function handleToggleFavorite() {
    if (post) {
      toggleFavorite({ id: post.id, type: 'post' });
    }
  }

  if (!post) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-ui-gray-900">Post not found.</p>
      </div>
    );
  }

  return (
    <>
      <LayeredHotkeys
        callback={handleToggleFavorite}
        keys="alt+f"
        options={{
          preventDefault: true,
        }}
      />
      <div className="flex h-full w-full">
        <div className="flex-1">
          <div className="flex h-full flex-col overflow-hidden rounded-md border bg-background">
            <PageHeader
              breadcrumb={[
                {
                  icon: post.space?.icon ? (
                    <span className="text-sm">{post.space.icon}</span>
                  ) : (
                    <Icons.space size={16} />
                  ),
                  label: post.space?.name || 'Space',
                  href: `/${slug}/spaces/${post.space.identifier}`,
                },
                {
                  label: post.title,
                },
              ]}
              leftContent={
                <Button
                  className={cn(
                    'size-7 rounded-sm',
                    isFavorited
                      ? 'text-ui-amber-700 hover:text-ui-amber-600'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => handleToggleFavorite()}
                  size={'icon'}
                  tooltip={isFavorited ? 'Unfavorite post' : 'Favorite post'}
                  tooltipShortcut="alt+f"
                  variant={'ghost'}
                >
                  <Icons.star className={isFavorited ? 'fill-current' : ''} />
                </Button>
              }
              rightContent={<PostOptions postId={post.id} />}
              showRightSidebarTrigger
            />
            <div className="flex-1 overflow-auto">
              <ActivitySection>
                {post.resolvedAt && post.resolvedById && (
                  <ResolvedPostLabel
                    resolvedAt={post.resolvedAt}
                    userName={post.resolvedBy?.name || ''}
                  />
                )}
                <PostMetadata
                  createdAt={post.createdAt}
                  userImage={post.author.image || ''}
                  userName={post.author.name || ''}
                />
                <EditablePostContent
                  initialContent={post.content}
                  initialTitle={post.title}
                  postId={post.id}
                />
                <EmojiReactions postId={post.id} />
                <Separator />
                <PostActivitySection postId={post.id} />
              </ActivitySection>
            </div>
          </div>
        </div>

        <Sidebar
          className="border-none"
          collapsible="offcanvas"
          side="right"
          variant="sidebar"
        >
          <SidebarContent>
            <PostSidebar
              postId={post.id}
              spaceIcon={post.space.icon || null}
              spaceName={post.space.name || ''}
            />
          </SidebarContent>
        </Sidebar>
      </div>
    </>
  );
}
