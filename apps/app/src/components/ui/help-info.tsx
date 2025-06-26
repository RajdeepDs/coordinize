import { Button } from '@coordinize/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@coordinize/ui/components/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { Fragment } from 'react';
import { helpNav } from '@/config/help-nav';

export function HelpInfo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-fit focus-visible:ring-0">
            <Button
              className="size-7 rounded-sm text-muted-foreground"
              size={'icon'}
              variant={'ghost'}
            >
              <Icons.help />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top">
            {helpNav.map((block) => (
              <Fragment key={block.index}>
                <DropdownMenuGroup>
                  {block.items.map((item) => {
                    const Icon = Icons[item.icon as keyof typeof Icons];
                    return (
                      <DropdownMenuItem key={item.title}>
                        <Icon />
                        {item.title}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
                {block.index !== helpNav.length && <DropdownMenuSeparator />}
              </Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
