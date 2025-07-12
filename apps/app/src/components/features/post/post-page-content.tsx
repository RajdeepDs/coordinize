'use client';

import { Button } from '@coordinize/ui/components/button';
import { Separator } from '@coordinize/ui/components/separator';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { useEffect, useState } from 'react';
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
  const [openDetails, setOpenDetails] = useState(true);

  // Keyboard shortcut to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ']') {
        event.preventDefault();
        setOpenDetails((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex h-full flex-1 flex-col overflow-hidden rounded border bg-background">
        <PostHeader
          onOpenDetails={setOpenDetails}
          openDetails={openDetails}
          space={post.space.name}
          title={post.title}
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
      <div
        className={cn(
          'relative bg-transparent transition-[width] duration-200 ease-linear',
          openDetails ? 'w-60' : 'w-0'
        )}
      />
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-10 h-svh w-60 transition-[right] duration-200 ease-linear',
          openDetails ? 'right-0' : 'right-[-20rem]'
        )}
      >
        <PostSidebar postId={post.id} spaceName={post.space.name} />
      </div>
    </div>
  );
}
