"use client";

import { Button } from "@coordinize/ui/components/button";
import { Icons } from "@coordinize/ui/lib/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useCreateComment } from "@/hooks/use-comments";
import { EMPTY_HTML } from "@/utils/markdown";
import { MarkdownEditor } from "../markdown-editor";

const commentFormSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty."),
});

type CommentFormData = z.infer<typeof commentFormSchema>;

type CommentFormProps = {
  postId: string;
  parentId?: string;
  placeholder?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
  variant?: "default" | "inline";
};

export function CommentForm({
  postId,
  parentId,
  placeholder = "Leave a comment...",
  onSuccess,
  variant = "default",
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

  const isInlineVariant = variant === "inline";

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div
        className={
          isInlineVariant
            ? "flex items-center gap-2 p-3"
            : "flex min-h-20 flex-col justify-between rounded-lg bg-background p-3 ring-1 ring-border"
        }
      >
        <div
          className={
            isInlineVariant
              ? "prose prose-sm max-w-none flex-1 text-foreground"
              : "min-h-0 flex-1 overflow-y-auto"
          }
        >
          <MarkdownEditor
            containerClasses="px-0 text-[15px] placeholder-shown:text-ui-gray-500"
            content={form.watch("content")}
            onChangeDebounced={(value: string) =>
              form.setValue("content", value)
            }
            placeholder={placeholder}
          />
        </div>
        <div
          className={
            isInlineVariant ? "" : "flex items-center justify-end pt-2"
          }
        >
          <Button
            aria-label={parentId ? "Post reply" : "Post comment"}
            className={
              isInlineVariant
                ? "mt-auto size-7 disabled:border disabled:border-ui-gray-500 disabled:bg-ui-gray-400 disabled:text-ui-gray-1000"
                : "size-8 disabled:border disabled:border-ui-gray-500 disabled:bg-ui-gray-400 disabled:text-ui-gray-1000"
            }
            disabled={
              isSubmitting ||
              !form.watch("content") ||
              form.watch("content") === EMPTY_HTML
            }
            size="sm"
            type="submit"
            variant="default"
          >
            <Icons.arrowUp />
          </Button>
        </div>
      </div>
    </form>
  );
}
