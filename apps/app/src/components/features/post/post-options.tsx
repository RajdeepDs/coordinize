import { Button } from '@coordinize/ui/components/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@coordinize/ui/components/popover';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';

interface PostOption {
  icon: (typeof Icons)[keyof typeof Icons];
  label: string;
}

const options: PostOption[][] = [
  [
    {
      icon: Icons.bellDot,
      label: 'Subscribe',
    },
    {
      icon: Icons.star,
      label: 'Favorite',
    },
  ],
  [
    {
      icon: Icons.space,
      label: 'Move to space',
    },
    {
      icon: Icons.pin,
      label: 'Pin to space',
    },
    {
      icon: Icons.resolve,
      label: 'Resolve post',
    },
  ],
  [
    {
      icon: Icons.share,
      label: 'Share',
    },
    {
      icon: Icons.link,
      label: 'Copy link',
    },
  ],
  [
    {
      icon: Icons.trash,
      label: 'Delete post',
    },
  ],
];

export function PostOptions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn('size-7 rounded-sm text-muted-foreground')}
          size={'icon'}
          tooltip="More options"
          variant={'ghost'}
        >
          <Icons.ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-56 overflow-hidden rounded-lg p-0"
      >
        <Sidebar className="bg-transparent" collapsible="none">
          <SidebarContent className="gap-0">
            {options.map((group) => (
              <SidebarGroup
                className="border-b p-1 last:border-none"
                key={group.map((item) => item.label).join('-')}
              >
                <SidebarGroupContent className="gap-0 p-0">
                  <SidebarMenu>
                    {group.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton>
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
      </PopoverContent>
    </Popover>
  );
}
