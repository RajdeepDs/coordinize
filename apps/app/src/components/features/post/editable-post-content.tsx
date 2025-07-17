'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@coordinize/ui/components/form';
import { Input } from '@coordinize/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod/v4';
import { MarkdownEditor } from '@/components/features/markdown-editor';
import { useUpdatePost } from '@/hooks/use-posts';
import { EMPTY_HTML } from '@/utils/markdown';

const updatePostFormSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  content: z.string(),
});

type UpdatePostFormData = z.infer<typeof updatePostFormSchema>;

interface EditablePostContentProps {
  postId: string;
  initialTitle: string;
  initialContent: string | null;
}

export function EditablePostContent({
  postId,
  initialTitle,
  initialContent = EMPTY_HTML,
}: EditablePostContentProps) {
  const { mutate: updatePost } = useUpdatePost(postId);

  const form = useForm<UpdatePostFormData>({
    resolver: zodResolver(updatePostFormSchema),
    defaultValues: {
      title: initialTitle,
      content: initialContent || EMPTY_HTML,
    },
  });

  const debouncedUpdate = useDebouncedCallback(
    (data: Partial<UpdatePostFormData>) => {
      const updateData: { id: string; title?: string; content?: string } = {
        id: postId,
      };

      if (data.title !== undefined && data.title !== initialTitle) {
        updateData.title = data.title;
      }
      if (
        data.content !== undefined &&
        data.content !== (initialContent || EMPTY_HTML)
      ) {
        updateData.content = data.content;
      }

      if (updateData.title !== undefined || updateData.content !== undefined) {
        updatePost(updateData);
      }
    },
    500
  );

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'title') {
        debouncedUpdate({ title: value.title });
      } else if (name === 'content') {
        debouncedUpdate({ content: value.content });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedUpdate]);

  useEffect(() => {
    form.reset({
      title: initialTitle,
      content: initialContent || EMPTY_HTML,
    });
  }, [initialTitle, initialContent, form]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="border-none px-0 font-medium text-accent-foreground focus-visible:ring-0 md:text-2xl"
                  placeholder="Post title"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MarkdownEditor
                  containerClasses="px-0 h-full"
                  content={field.value}
                  onChangeDebounced={(newContent) => {
                    field.onChange(newContent);
                  }}
                  placeholder="Write something about this post..."
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
