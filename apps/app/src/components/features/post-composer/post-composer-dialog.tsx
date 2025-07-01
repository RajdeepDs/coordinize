'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@coordinize/ui/components/dialog';
import { SidebarMenuButton } from '@coordinize/ui/components/sidebar';
import { LayeredHotkeys } from '@coordinize/ui/layered-hotkeys';
import { useRef, useState } from 'react';
import {
  type InlineComposerRef,
  PostComposerForm,
  PostComposerFormProvider,
} from './post-composer-form';
import { UnsavedChangesDialog } from './unsaved-changes-dialog';

export function PostComposerDialog() {
  const [open, setOpen] = useState(false);
  const [isClose, _] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  const formRef = useRef<InlineComposerRef>(null);

  const handleCreatePost = () => {
    setOpen(true);
  };

  const handleDialogClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formRef.current?.isDirty) {
      setShowUnsavedDialog(true);
      return;
    }
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && formRef.current?.isDirty && isClose === true) {
      setShowUnsavedDialog(true);
      return;
    }
    setOpen(newOpen);
  };

  const handleDiscard = () => {
    formRef.current?.clearLocalStorage();
    setShowUnsavedDialog(false);
    setOpen(false);
  };

  const handleSaveAsDraft = () => {
    setShowUnsavedDialog(false);
    setOpen(false);
  };

  return (
    <>
      <LayeredHotkeys
        callback={handleCreatePost}
        keys={'c'}
        options={{ preventDefault: true }}
      />

      <PostComposerFormProvider ref={formRef}>
        <Dialog onOpenChange={handleOpenChange} open={open}>
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
          <DialogContent
            className="top-[10%] flex max-h-[32rem] min-h-[16rem] translate-y-0 flex-col gap-3 p-3 shadow-xl/5 lg:max-w-3xl [&>button:last-child]:top-3.5"
            onClose={handleDialogClose}
          >
            <DialogTitle className="sr-only">Compose post</DialogTitle>
            <PostComposerForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </PostComposerFormProvider>

      <UnsavedChangesDialog
        onDiscard={handleDiscard}
        onOpenChange={setShowUnsavedDialog}
        onSaveAsDraft={handleSaveAsDraft}
        open={showUnsavedDialog}
      />
    </>
  );
}
