'use client';

import { Button } from '@coordinize/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@coordinize/ui/components/dialog';
import { Input } from '@coordinize/ui/components/input';
import { SidebarMenuButton } from '@coordinize/ui/components/sidebar';
import { LayeredHotkeys } from '@coordinize/ui/layered-hotkeys';
import { Icons } from '@coordinize/ui/lib/icons';
import { useState } from 'react';

export function ComposerDialog() {
  const [open, setOpen] = useState(false);

  const handleCreatePost = () => {
    setOpen(true);
  };

  return (
    <>
      <LayeredHotkeys
        callback={handleCreatePost}
        keys={'c'}
        options={{ preventDefault: true }}
      />

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <SidebarMenuButton
            className="flex cursor-pointer justify-center border transition-colors duration-300 ease-in-out hover:border-ui-gray-500"
            tooltip="Create a new post"
            tooltipShortcut="c"
            variant={'outline'}
          >
            <span className="font-normal">New post</span>
          </SidebarMenuButton>
        </DialogTrigger>
        <DialogContent className="top-[25%] flex h-[16rem] flex-col gap-3 p-3 shadow-xl/5 lg:max-w-3xl [&>button:last-child]:top-3.5">
          <DialogTitle className="sr-only">Compose post</DialogTitle>
          <div className="flex items-start gap-2 text-sm">
            <p>Engineering</p>
            <span className="flex items-center gap-1 text-muted-foreground">
              ENG <Icons.chevronDown size={16} />
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              className="border-none px-0 font-medium text-accent-foreground focus-visible:ring-0 md:text-base"
              placeholder="Post title"
            />
            <p className="text-muted-foreground text-sm">
              Write something about it...
            </p>
          </div>
          <DialogFooter className="mt-auto flex w-full flex-row items-end justify-between sm:justify-between">
            <div>
              <Button size="icon" variant="ghost">
                <Icons.emojiPlus />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost">
                Save as draft
              </Button>
              <Button size="sm">Create post</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
