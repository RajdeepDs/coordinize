'use client';

import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { useCreateComment } from '@/hooks/use-comments';
import { EMPTY_HTML } from '@/utils/markdown';
import { MarkdownEditor } from '../markdown-editor';

const commentFormSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty.'),
});

type CommentFormData = z.infer<typeof commentFormSchema>;

interface CommentFormProps {
  postId: string;
  parentId?: string;
  placeholder?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function CommentForm({
  postId,
  parentId,
  placeholder = 'Add a comment...',
  onCancel,
  onSuccess,
}: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createComment } = useCreateComment(postId);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: EMPTY_HTML,
    },
  });

  const handleSubmit = (data: CommentFormData) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    createComment(
      {
        postId,
        parentId,
        content: data.content,
      },
      {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  const handleCancel = () => {
    form.reset();
    onCancel?.();
  };

  const getButtonText = () => {
    if (isSubmitting) {
      return 'Posting...';
    }
    return parentId ? 'Reply' : 'Comment';
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex min-h-[6rem] flex-col justify-between rounded-lg bg-background p-3 ring-1 ring-border">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <MarkdownEditor
            containerClasses="px-0"
            content={form.watch('content')}
            onChangeDebounced={(value: string) =>
              form.setValue('content', value)
            }
            placeholder={placeholder}
          />
        </div>
        <div className="flex items-center justify-between pt-2">
          <Button size="icon" type="button" variant="ghost">
            <Icons.emojiPlus />
          </Button>
          <div className="flex gap-2">
            {onCancel && (
              <Button
                onClick={handleCancel}
                size="sm"
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
            )}
            <Button
              disabled={
                isSubmitting ||
                !form.watch('content') ||
                form.watch('content') === EMPTY_HTML
              }
              size="sm"
              type="submit"
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
