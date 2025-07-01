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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save your drafts?</AlertDialogTitle>
          <AlertDialogDescription>
            You can finish this post later from your drafts.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full sm:justify-between">
          <AlertDialogCancel
            className={cn(buttonVariants({ variant: 'outline' }))}
            onClick={onDiscard}
          >
            Discard
          </AlertDialogCancel>
          <div className="flex gap-2 ">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSaveAsDraft}>Save</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
