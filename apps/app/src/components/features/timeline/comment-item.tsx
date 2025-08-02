'use client';

import type { Comment, User } from '@coordinize/database/db';
import { MarkdownEditor } from '@/components/features/markdown-editor';
import AvatarStatus from '@/components/ui/avatar-status';
import { formatDate } from '@/utils/format-date';

interface CommentItemProps {
  comment: Comment & {
    author: Partial<User>;
  };
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="w-full space-y-2 rounded-md border p-3">
      <div className="flex select-none items-center gap-2">
        <AvatarStatus
          alt="comment-author-image"
          className="size-6"
          fallback={comment.author?.name?.at(0) ?? ''}
          src={comment.author?.image ?? ''}
          statusShow={false}
        />
        <p className="font-medium text-sm">{comment.author?.name}</p>
        <span className="text-sm text-ui-gray-900">
          {formatDate(comment.createdAt)}
        </span>
      </div>
      <div className="prose prose-sm max-w-none text-foreground">
        <MarkdownEditor
          containerClasses="px-0"
          content={comment.content}
          editable={false}
        />
      </div>
    </div>
  );
}
