import { Button } from '@coordinize/ui/components/button';
import { DialogFooter } from '@coordinize/ui/components/dialog';
import { Input } from '@coordinize/ui/components/input';
import { Icons } from '@coordinize/ui/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { MarkdownEditor } from '@/components/features/markdown-editor';
import { PostComposerSpacesPicker } from '@/components/features/post-composer/post-composer-spaces-picker';
import { useSpacesQuery } from '@/hooks/use-space';
import { useCurrentWorkspaceQuery } from '@/hooks/use-workspace';
import {
  type PostSchema,
  postDefaultValues,
  postSchema,
} from '@/lib/schemas/post';

export interface InlineComposerRef {
  isDirty: boolean;
}

export const PostComposerFormProvider = forwardRef<
  InlineComposerRef,
  React.PropsWithChildren
>(function InlineComposer({ children }, ref) {
  const defaultValues = postDefaultValues;

  const methods = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  const isDirty = methods.formState.isDirty;

  useImperativeHandle(ref, () => ({ isDirty }), [isDirty]);

  return <FormProvider {...methods}>{children}</FormProvider>;
});

export function PostComposerForm() {
  const { data: spaces } = useSpacesQuery();
  const { data: workspace } = useCurrentWorkspaceQuery();

  const methods = useFormContext<PostSchema>();
  const { control, handleSubmit, watch, formState } = methods;

  const formValues = watch();
  const isFormValid =
    formValues.title?.trim() &&
    formValues.description?.trim() &&
    formValues.space_id;

  const onSubmit = (data: PostSchema) => {
    methods.reset();
  };

  return (
    <>
      <PostComposerSpacesPicker
        spaces={spaces}
        workspaceSlug={workspace?.slug ?? ''}
      />

      <div className="flex flex-col gap-1 overflow-hidden">
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Input
              {...field}
              className="border-none px-0 font-medium text-accent-foreground focus-visible:ring-0 md:text-base"
              placeholder="Post title"
            />
          )}
        />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <MarkdownEditor
                {...field}
                containerClasses="px-0 h-full"
                onChangeDebounced={field.onChange}
                placeholder="Write something about it..."
              />
            )}
          />
        </div>
      </div>
      <DialogFooter className="mt-auto flex w-full flex-row items-end justify-between sm:justify-between">
        <div>
          <Button size="icon" variant="ghost">
            <Icons.emojiPlus />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={
              !(formValues.title?.trim() || formValues.description?.trim())
            }
            size="sm"
            type="button"
            variant="ghost"
          >
            Save as draft
          </Button>
          <Button
            disabled={!isFormValid || formState.isSubmitting}
            onClick={handleSubmit(onSubmit)}
            size="sm"
            type="button"
          >
            {formState.isSubmitting ? 'Creating...' : 'Create post'}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
