'use client';
import { Button } from '@coordinize/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@coordinize/ui/components/dropdown-menu';
import { Label } from '@coordinize/ui/components/label';
import { Icons } from '@coordinize/ui/icons';

interface InboxFilterOption {
  icon?: (typeof Icons)[keyof typeof Icons];
  label: string;
  subMenu?: Array<{
    icon?: (typeof Icons)[keyof typeof Icons];
    label: string;
    onClick?: () => void;
  }>;
}

export function InboxFilter() {
  const options: InboxFilterOption[] = [
    {
      label: 'All Notifications',
      icon: Icons.inbox,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-0">
        <Button
          className="size-7 rounded-sm text-muted-foreground"
          size={'icon'}
          tooltip="Filter notifications by"
          tooltipShortcut="F"
          variant={'ghost'}
        >
          <Icons.listFilter />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 overflow-hidden rounded-lg p-0"
      >
        <div className="p-1">
          <Label className="p-1 font-normal text-ui-gray-900">Filter</Label>
          {options.map((item) => (
            <DropdownMenuItem className="flex items-center" key={item.label}>
              {item.icon && (
                <item.icon className="size-4 text-muted-foreground" />
              )}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
