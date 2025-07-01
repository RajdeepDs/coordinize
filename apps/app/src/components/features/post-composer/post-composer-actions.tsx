import { Button } from '@coordinize/ui/components/button';
import { DialogFooter } from '@coordinize/ui/components/dialog';
import { Icons } from '@coordinize/ui/lib/icons';
import { useFormContext } from 'react-hook-form';
import type { PostSchema } from '@/lib/schemas/post';

interface PostComposerActionsProps {
  onSubmit: (data: PostSchema) => void;
  onSaveDraft: (data: PostSchema) => void;
  isSubmitting: boolean;
  isDraftSaving: boolean;
}

export function PostComposerActions({
  onSubmit,
  onSaveDraft,
  isSubmitting,
  isDraftSaving,
}: PostComposerActionsProps) {
  const methods = useFormContext<PostSchema>();
  const { handleSubmit, watch, getValues } = methods;

  const formValues = watch();
  const isFormValid =
    formValues.title?.trim() &&
    formValues.description?.trim() &&
    formValues.space_id;

  const canSaveDraft =
    (formValues.title?.trim() || formValues.description?.trim()) &&
    formValues.space_id &&
    !isDraftSaving;

  const handleSaveDraft = () => {
    const currentValues = getValues();
    onSaveDraft(currentValues);
  };

  return (
    <DialogFooter className="mt-auto flex w-full flex-row items-end justify-between sm:justify-between">
      <div>
        <Button disabled size="icon" variant="ghost">
          <Icons.emojiPlus />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          disabled={!canSaveDraft}
          onClick={handleSaveDraft}
          size="sm"
          variant="ghost"
        >
          Save as draft
        </Button>
        <Button
          disabled={!isFormValid || isSubmitting}
          onClick={handleSubmit(onSubmit)}
          size="sm"
        >
          Create post
        </Button>
      </div>
    </DialogFooter>
  );
}
