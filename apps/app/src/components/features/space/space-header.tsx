'use client';

import { Button } from '@coordinize/ui/components/button';
import { Label } from '@coordinize/ui/components/label';
import { SidebarTrigger, useSidebar } from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { useSpaceWithPublishedPostsQuery } from '@/hooks/use-space';

interface SpaceHeaderProps {
  identifier: string;
}

export function SpaceHeader({ identifier }: SpaceHeaderProps) {
  const { isMobile, leftState } = useSidebar();
  const { data: space } = useSpaceWithPublishedPostsQuery(identifier);

  return (
    <header className="flex items-center justify-between px-2 py-1">
      <div className="flex h-full items-center gap-3">
        <div
          className={cn(
            'flex h-full items-center',
            isMobile || leftState === 'collapsed' ? 'flex' : 'hidden'
          )}
        >
          <SidebarTrigger className="size-7 rounded-sm text-muted-foreground" />
        </div>
        <div className="flex items-center gap-1">
          <Label className="font-normal">
            <Icons.space size={16} />
            Spaces
          </Label>
          <span className="text-ui-gray-900">/</span>
          <Label className="font-normal">
            {space?.name || 'Unknown Space'}
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
      <SidebarTrigger
        className="size-7 rounded-sm text-muted-foreground focus-visible:ring-0"
        side="right"
      />
    </header>
  );
}
