'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@coordinize/ui/components/alert-dialog';
import { buttonVariants } from '@coordinize/ui/components/button';
import { cn } from '@coordinize/ui/lib/utils';

interface UnsavedChangesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDiscard: () => void;
  onSaveAsDraft: () => void;
}

export function UnsavedChangesDialog({
  open,
  onOpenChange,
  onDiscard,
  onSaveAsDraft,
}: UnsavedChangesDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent className="top-[35%] sm:max-w-[32rem]">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal text-base">
            Save your drafts?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You can finish this post later from your drafts.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full sm:justify-between">
          <AlertDialogCancel
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            onClick={onDiscard}
          >
            Discard
          </AlertDialogCancel>
          <div className="flex gap-2 ">
            <AlertDialogCancel
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(buttonVariants({ size: 'sm' }))}
              onClick={onSaveAsDraft}
            >
              Save
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
