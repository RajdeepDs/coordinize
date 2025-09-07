import type { PostSchema } from "@coordinize/api/schemas";
import { Input } from "@coordinize/ui/components/input";
import { Controller, useFormContext } from "react-hook-form";
import { MarkdownEditor } from "@/components/features/markdown-editor";

type PostComposerFormProps = {
  children?: React.ReactNode;
};

export function PostComposerForm({ children }: PostComposerFormProps) {
  const { control } = useFormContext<PostSchema>();

  return (
    <>
      {children}

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
                content={field.value || ""}
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
