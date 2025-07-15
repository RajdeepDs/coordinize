'use client';

import { Button } from '@coordinize/ui/components/button';
import { Separator } from '@coordinize/ui/components/separator';
import { Sidebar, SidebarContent } from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { useParams } from 'next/navigation';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { PostActivitySection } from '@/components/features/post/post-activity-section';
import { PostContent } from '@/components/features/post/post-content';
import { PostMetadata } from '@/components/features/post/post-metadata';
import { PostOptions } from '@/components/features/post/post-options';
import { PostSidebar } from '@/components/features/post/post-sidebar';
import { PageHeader } from '@/components/layout/page-header';

interface Post {
  id: string;
  title: string;
  content: string | null;
  createdAt: Date;
  author: {
    name: string;
    image: string | null;
  };
  space: {
    name: string;
    identifier: string;
    icon: string | null;
  };
}

interface PostPageContentProps {
  post: Post;
}

export function PostPageContent({ post }: PostPageContentProps) {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="flex h-full w-full">
      <div className="flex-1">
        <div className="flex h-full flex-col overflow-hidden rounded border bg-background">
          <PageHeader
            breadcrumb={[
              {
                icon: post.space?.icon ? (
                  <span className="text-sm">{post.space.icon}</span>
                ) : (
                  <Icons.space size={16} />
                ),
                label: post.space?.name,
                href: `/${slug}/spaces/${post.space.identifier}`,
              },
              {
                label: post.title,
              },
            ]}
            leftContent={
              <Button
                className={cn('size-7 rounded-sm text-muted-foreground')}
                size={'icon'}
                tooltip="Add to your favorites"
                variant={'ghost'}
              >
                <Icons.star />
              </Button>
            }
            rightContent={<PostOptions />}
            showRightSidebarTrigger={true}
          />
          <div className="flex-1 overflow-auto">
            <ActivitySection>
              <PostMetadata
                createdAt={post.createdAt}
                userImage={post.author.image || ''}
                userName={post.author.name}
              />
              <PostContent content={post.content || ''} title={post.title} />
              <Button
                className={cn('size-7 rounded-sm text-muted-foreground')}
                size={'icon'}
                tooltip="Add a reaction"
                variant={'ghost'}
              >
                <Icons.emojiPlus size={16} />
              </Button>
              <Separator />
              <PostActivitySection />
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
            spaceIcon={post.space.icon}
            spaceName={post.space.name}
          />
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
