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
import { useGlobalHotkeys } from '@coordinize/ui/hooks';
import { Icons } from '@coordinize/ui/lib/icons';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { helpNav } from '@/config/help-nav';
import { ShortcutSheet } from './shortcut-sheet';

interface HelpInfoProps {
  align?: 'start' | 'end' | 'center';
}

export function HelpInfo({ align = 'end' }: HelpInfoProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [shortcutSheetOpen, setShortcutSheetOpen] = useState(false);

  const handleOpenHelp = () => {
    setOpen(true);
  };

  const handleItemClick = (item: {
    title: string;
    href?: string;
    icon: string;
    shortcut?: string;
  }) => {
    if (item.title === 'Shortcuts') {
      setShortcutSheetOpen(true);
      setOpen(false);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  useGlobalHotkeys({
    keys: 'ctrl+slash',
    callback: () => setShortcutSheetOpen((prev) => !prev),
    options: { preventDefault: true },
  });

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
                        <DropdownMenuItem
                          key={item.title}
                          onClick={() => handleItemClick(item)}
                        >
                          <Icon />
                          {item.title}
                          {item.shortcut ? (
                            <DropdownMenuShortcut className="ml-auto">
                              <KeyboardShortcut
                                className="border-none"
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
      <ShortcutSheet
        onOpenChange={setShortcutSheetOpen}
        open={shortcutSheetOpen}
      />
    </>
  );
}
