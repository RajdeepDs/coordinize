'use client';

import { Button } from '@coordinize/ui/components/button';
import { Label } from '@coordinize/ui/components/label';
import { SidebarTrigger, useSidebar } from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';

interface PostHeaderProps {
  space: string;
  title: string;
  openDetails: boolean;
  onOpenDetails: (open: boolean) => void;
}

export function PostHeader({
  space,
  title,
  openDetails,
  onOpenDetails,
}: PostHeaderProps) {
  const { isMobile, state } = useSidebar();

  return (
    <header className="flex items-center justify-between px-2 py-1">
      <div className="flex h-full items-center gap-3">
        <div
          className={cn(
            'flex h-full items-center',
            isMobile || state === 'collapsed' ? 'flex' : 'hidden'
          )}
        >
          <SidebarTrigger className="size-7 rounded-sm text-muted-foreground" />
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
        <div className="flex items-center gap-2">
          <Button
            className={cn('size-7 rounded-sm text-muted-foreground')}
            size={'icon'}
            tooltip="More options"
            variant={'ghost'}
          >
            <Icons.ellipsis />
          </Button>
          <Button
            className={cn('size-7 rounded-sm text-muted-foreground')}
            size={'icon'}
            tooltip="Add to your favorites"
            variant={'ghost'}
          >
            <Icons.star />
          </Button>
        </div>
      </div>
      <Button
        className={cn(
          'size-7 rounded-sm text-muted-foreground focus-visible:ring-0'
        )}
        onClick={() => onOpenDetails(!openDetails)}
        size={'icon'}
        tooltip={openDetails ? 'Close details' : 'Open details'}
        tooltipShortcut="]"
        variant={'ghost'}
      >
        <Icons.panelRight />
      </Button>
    </header>
  );
}
