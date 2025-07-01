'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@coordinize/ui/components/dialog';
import { SidebarMenuButton } from '@coordinize/ui/components/sidebar';
import { LayeredHotkeys } from '@coordinize/ui/layered-hotkeys';
import { useState } from 'react';
import {
  PostComposerForm,
  PostComposerFormProvider,
} from './post-composer-form';

export function PostComposerDialog() {
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

      <PostComposerFormProvider>
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
          <DialogContent className="top-[10%] flex max-h-[32rem] min-h-[16rem] translate-y-0 flex-col gap-3 p-3 shadow-xl/5 lg:max-w-3xl [&>button:last-child]:top-3.5">
            <DialogTitle className="sr-only">Compose post</DialogTitle>
            <PostComposerForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </PostComposerFormProvider>
    </>
  );
}
