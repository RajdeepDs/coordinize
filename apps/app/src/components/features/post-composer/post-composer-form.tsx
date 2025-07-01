import { Input } from '@coordinize/ui/components/input';
import { Controller, useFormContext } from 'react-hook-form';
import { MarkdownEditor } from '@/components/features/markdown-editor';
import { PostComposerSpacesPicker } from '@/components/features/post-composer/post-composer-spaces-picker';
import type { PostSchema } from '@/lib/schemas/post';

interface PostComposerFormProps {
  spaces:
    | Array<{
        id: string;
        name: string;
        about: string | null;
        identifier: string;
        workspaceId: string;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
      }>
    | undefined;
  workspaceSlug: string;
}

export function PostComposerForm({
  spaces,
  workspaceSlug,
}: PostComposerFormProps) {
  const { control } = useFormContext<PostSchema>();

  return (
    <>
      <PostComposerSpacesPicker
        spaces={spaces || []}
        workspaceSlug={workspaceSlug}
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
                content={field.value || ''}
                onChangeDebounced={field.onChange}
                placeholder="Write something about it..."
              />
            )}
          />
        </div>
      </div>
    </>
  );
}
