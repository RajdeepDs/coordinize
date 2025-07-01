import { Button } from '@coordinize/ui/components/button';
import { DialogFooter } from '@coordinize/ui/components/dialog';
import { Input } from '@coordinize/ui/components/input';
import { Icons } from '@coordinize/ui/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { useTRPC } from '@/trpc/client';

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
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: spaces } = useSpacesQuery();
  const { data: workspace } = useCurrentWorkspaceQuery();

  const methods = useFormContext<PostSchema>();
  const { control, handleSubmit, watch } = methods;

  const formValues = watch();
  const isFormValid =
    formValues.title?.trim() &&
    formValues.description?.trim() &&
    formValues.space_id;

  const { mutate, status } = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: () => {
        // Post created successfully
        methods.reset();
      },
    })
  );

  const { mutate: mutateDraft, status: draftStatus } = useMutation(
    trpc.post.createDraft.mutationOptions({
      onSettled: () => {
        // Draft saved successfully
        queryClient.invalidateQueries({
          queryKey: trpc.post.getDrafts.queryKey(),
        });
        methods.reset();
      },
    })
  );

  const onSubmit = (data: PostSchema) => {
    mutate({
      title: data.title,
      description: data.description,
      space_id: data.space_id,
    });
  };

  const onSaveDraft = () => {
    const currentValues = methods.getValues();
    mutateDraft({
      title: currentValues.title,
      description: currentValues.description,
      space_id: currentValues.space_id,
    });
  };

  const canSaveDraft =
    (formValues.title?.trim() || formValues.description?.trim()) &&
    formValues.space_id &&
    draftStatus !== 'pending';

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
          <Button disabled size="icon" variant="ghost">
            <Icons.emojiPlus />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={!canSaveDraft}
            onClick={onSaveDraft}
            size="sm"
            variant="ghost"
          >
            Save as draft
          </Button>
          <Button
            disabled={!isFormValid || status === 'pending'}
            onClick={handleSubmit(onSubmit)}
            size="sm"
            type="submit"
          >
            Create post
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
