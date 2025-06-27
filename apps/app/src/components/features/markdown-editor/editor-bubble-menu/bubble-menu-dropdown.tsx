import { Button } from '@coordinize/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@coordinize/ui/components/dropdown-menu';
import { Tooltip } from '@coordinize/ui/components/tooltip';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import type React from 'react';

export interface MenuItems {
  label: string;
  type: string;
  isActive: () => boolean;
  onClick: () => void;
  icon: string;
}

interface BubbleMenuDropdownProps {
  items: MenuItems[];
  menuIcon: React.ReactNode;
  tooltip?: string;
}

export function BubbleMenuDropdown({
  items,
  menuIcon,
  tooltip,
}: BubbleMenuDropdownProps) {
  return (
    <DropdownMenu>
      <Tooltip label={tooltip}>
        <DropdownMenuTrigger asChild className="focus-visible:ring-0">
          <Button
            className={cn('size-min h-6 gap-0.5 rounded px-1')}
            size={'icon'}
            variant={'ghost'}
          >
            {menuIcon}
            <Icons.chevronDown />
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent
        align="start"
        alignOffset={0}
        className={cn(
          'z-[100] focus:outline-none',
          'w-[12rem] rounded-lg border bg-background p-1 text-primary shadow-md'
        )}
        sideOffset={4}
      >
        {items.map((item) => {
          // Get the icon component or use a generic component
          const iconKey = item.icon as keyof typeof Icons;
          const IconComponent =
            Icons[iconKey] || (() => <div className="h-4 w-4" />);

          return (
            <DropdownMenuItem
              className={cn('flex items-center justify-between')}
              key={item.label}
              onClick={item.onClick}
            >
              <div className="flex items-center gap-2">
                <IconComponent />
                <span>{item.label}</span>
              </div>
              {item.isActive() ? <Icons.check /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
