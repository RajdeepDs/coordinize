'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@coordinize/ui/components/dialog';
import { SidebarMenuButton } from '@coordinize/ui/components/sidebar';
import { LayeredHotkeys } from '@coordinize/ui/layered-hotkeys';
import { cn } from '@coordinize/ui/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useLocalStoragePost } from '@/hooks/use-local-storage-post';
import { useSpacesQuery } from '@/hooks/use-space';
import { useCurrentWorkspaceQuery } from '@/hooks/use-workspace';
import type { PostSchema } from '@/lib/schemas/post';
import { useTRPC } from '@/trpc/client';
import { PostComposerActions } from './post-composer-actions';
import { PostComposerForm } from './post-composer-form';
import {
  PostComposerFormProvider,
  type PostComposerFormRef,
} from './post-composer-form-provider';
import { UnsavedChangesDialog } from './unsaved-changes-dialog';

export function PostComposerDialog() {
  const [open, setOpen] = useState(false);
  const [isClose, _] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  const formRef = useRef<PostComposerFormRef>(null);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: spaces } = useSpacesQuery();
  const { data: workspace } = useCurrentWorkspaceQuery();
  const { clearLocalStorage, hasStoredPost } = useLocalStoragePost();

  const { mutate: createPost, status: isSubmitting } = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: () => {
        clearLocalStorage();
        formRef.current?.reset();
        setOpen(false);
      },
    })
  );

  const { mutate: createDraft, status: isDraftSaving } = useMutation(
    trpc.post.createDraft.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.post.getDrafts.queryKey(),
        });
        clearLocalStorage();
        formRef.current?.reset();
        setOpen(false);
      },
    })
  );

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
    formRef.current?.reset();
    setShowUnsavedDialog(false);
    setOpen(false);
  };

  const handleSaveAsDraft = () => {
    const currentValues = formRef.current?.getValues();
    if (currentValues) {
      createDraft({
        title: currentValues.title,
        description: currentValues.description,
        space_id: currentValues.space_id,
      });
    }
    formRef.current?.clearLocalStorage();
    formRef.current?.reset();
    setShowUnsavedDialog(false);
    setOpen(false);
  };

  const handleSubmitPost = (data: PostSchema) => {
    createPost({
      title: data.title,
      description: data.description,
      space_id: data.space_id,
    });
  };

  const handleSaveDraft = (data: PostSchema) => {
    createDraft({
      title: data.title,
      description: data.description,
      space_id: data.space_id,
    });
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
              className={cn(
                'relative flex cursor-pointer justify-center overflow-visible border transition-colors duration-300 ease-in-out hover:border-ui-gray-500'
              )}
              tooltip="Create a new post"
              tooltipShortcut="c"
              variant={'outline'}
            >
              <span className="font-normal">New post</span>
              {hasStoredPost && (
                <span className="-right-1 -top-1 absolute h-2 w-2 rounded-full bg-ui-blue-800" />
              )}
            </SidebarMenuButton>
          </DialogTrigger>
          <DialogContent
            className="top-[10%] flex max-h-[32rem] min-h-[16rem] translate-y-0 flex-col gap-3 p-3 shadow-xl/5 lg:max-w-3xl [&>button:last-child]:top-3.5"
            onClose={handleDialogClose}
          >
            <DialogTitle className="sr-only">Compose post</DialogTitle>
            <DialogDescription className="sr-only">
              Dialog to create a new post.
            </DialogDescription>
            <PostComposerForm
              spaces={spaces}
              workspaceSlug={workspace?.slug ?? ''}
            />
            <PostComposerActions
              isDraftSaving={isDraftSaving === 'pending'}
              isSubmitting={isSubmitting === 'pending'}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmitPost}
            />
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
