'use client';

import { Button } from '@coordinize/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@coordinize/ui/components/dropdown-menu';
import { KeyboardShortcut } from '@coordinize/ui/components/keyboard-shortcut';
import { LayeredHotkeys } from '@coordinize/ui/components/layered-hotkeys';
import {
  SidebarMenu,
  SidebarMenuItem,
} from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { Fragment, useState } from 'react';
import { helpNav } from '@/config/help-nav';

interface HelpInfoProps {
  align?: 'start' | 'end' | 'center';
}

export function HelpInfo({ align = 'end' }: HelpInfoProps) {
  const [open, setOpen] = useState(false);

  const handleOpenHelp = () => {
    setOpen(true);
  };
  return (
    <>
      <LayeredHotkeys
        callback={handleOpenHelp}
        keys={'shift+slash'}
        options={{ preventDefault: true }}
      />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu onOpenChange={setOpen} open={open}>
            <DropdownMenuTrigger asChild className="w-fit focus-visible:ring-0">
              <Button
                className="size-7 rounded-sm text-muted-foreground"
                size={'icon'}
                tooltip="Help"
                tooltipShortcut="?"
                variant={'ghost'}
              >
                <Icons.help />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} className="w-[14rem]" side="top">
              {helpNav.map((block) => (
                <Fragment key={block.index}>
                  <DropdownMenuGroup>
                    {block.items.map((item) => {
                      const Icon = Icons[item.icon as keyof typeof Icons];
                      return (
                        <DropdownMenuItem key={item.title}>
                          <Icon />
                          {item.title}
                          {item.shortcut ? (
                            <DropdownMenuShortcut className="ml-auto">
                              <KeyboardShortcut
                                className="border-none"
                                keysClassName="text-[1em]"
                                shortcut={item.shortcut}
                              />
                            </DropdownMenuShortcut>
                          ) : null}
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
    </>
  );
}
