'use client';

import { Button } from '@coordinize/ui/components/button';
import { Label } from '@coordinize/ui/components/label';
import { SidebarTrigger, useSidebar } from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { PostOptions } from './post-options';

interface PostHeaderProps {
  space: string;
  title: string;
  postId: string;
}

export function PostHeader({ space, title, postId }: PostHeaderProps) {
  const { isMobile, leftState } = useSidebar();

  return (
    <header className="flex items-center justify-between px-2 py-1">
      <div className="flex h-full items-center gap-3">
        <div
          className={cn(
            'flex h-full items-center',
            isMobile || leftState === 'collapsed' ? 'flex' : 'hidden'
          )}
        >
          <SidebarTrigger
            className="size-7 rounded-sm text-muted-foreground"
            side="left"
          />
        </div>

        <div className="flex items-center gap-1">
          <Label className="font-normal">
            <Icons.space size={16} />
            {space}
          </Label>
          <span className="text-ui-gray-900">/</span>
          <Label className="font-normal">
            {title.split(' ').slice(0, 10).join(' ')}
            {title.split(' ').length > 10 && '...'}
          </Label>
        </div>
        <Button
          className={cn('size-7 rounded-sm text-muted-foreground')}
          size={'icon'}
          tooltip="Add to your favorites"
          variant={'ghost'}
        >
          <Icons.star />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <PostOptions postId={postId} />
        <SidebarTrigger
          className="size-7 rounded-sm text-muted-foreground focus-visible:ring-0"
          side="right"
        />
      </div>
    </header>
  );
}
