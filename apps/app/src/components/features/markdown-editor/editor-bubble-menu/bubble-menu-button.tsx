import { Button } from '@coordinize/ui/components/button';
import { Tooltip } from '@coordinize/ui/components/tooltip';
import { cn } from '@coordinize/ui/lib/utils';
import type React from 'react';

interface BubbleMenuButtonProps extends React.ComponentPropsWithRef<'button'> {
  icon: React.ReactNode;
  className?: string;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  tooltip?: string | React.ReactNode;
  tooltipShortcut?: string;
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
  tooltipAlign?: 'start' | 'center' | 'end';
}

export function BubbleMenuButton({
  icon,
  className,
  onClick,
  isActive,
  tooltip,
  tooltipAlign,
  tooltipShortcut,
  tooltipSide,
}: BubbleMenuButtonProps) {
  return (
    <Tooltip
      align={tooltipAlign}
      label={tooltip}
      shortcut={tooltipShortcut}
      side={tooltipSide}
    >
      <Button
        className={cn(
          'size-6 rounded',
          {
            'bg-ui-gray-200 text-primary': isActive,
          },
          className
        )}
        onClick={onClick}
        size={'icon'}
        variant={'ghost'}
      >
        {icon}
      </Button>
    </Tooltip>
  );
}
