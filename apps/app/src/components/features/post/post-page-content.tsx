'use client';

import { Button } from '@coordinize/ui/components/button';
import { Separator } from '@coordinize/ui/components/separator';
import { Sidebar, SidebarContent } from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { PostActivitySection } from '@/components/features/post/post-activity-section';
import { PostContent } from '@/components/features/post/post-content';
import { PostHeader } from '@/components/features/post/post-header';
import { PostMetadata } from '@/components/features/post/post-metadata';
import { PostSidebar } from '@/components/features/post/post-sidebar';

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
  };
}

interface PostPageContentProps {
  post: Post;
}

export function PostPageContent({ post }: PostPageContentProps) {
  return (
    <div className="flex h-full w-full">
      <div className="flex-1">
        <div className="flex h-full flex-col overflow-hidden rounded border bg-background">
          <PostHeader space={post.space.name} title={post.title} />
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
          <PostSidebar postId={post.id} spaceName={post.space.name} />
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
