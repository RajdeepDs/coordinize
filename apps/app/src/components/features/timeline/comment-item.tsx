'use client';

import type { Comment, User } from '@coordinize/database/db';
import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import { MarkdownEditor } from '@/components/features/markdown-editor';
import AvatarStatus from '@/components/ui/avatar-status';
import { formatDate } from '@/utils/format-date';
import { CommentProvider } from './comment-context';

type CommentWithAuthor = Comment & {
  author: Partial<User>;
  replies?: CommentWithAuthor[];
};

interface CommentItemProps {
  comment: CommentWithAuthor;
}

interface CommentContainerProps {
  comment: CommentWithAuthor;
}

export function CommentContainer({ comment }: CommentContainerProps) {
  return (
    <CommentProvider>
      <div className="w-full rounded-md border">
        <CommentItem comment={comment} />
        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="border-ui-gray-200 border-t pl-5">
            {comment.replies.map((reply) => (
              <CommentItem comment={reply} key={reply.id} />
            ))}
          </div>
        )}
      </div>
    </CommentProvider>
  );
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="group relative flex flex-col gap-y-2 p-3">
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
      {/* Comment Options */}
      <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
        <CommentOptions />
      </div>
    </div>
  );
}

function CommentOptions({
  onReplyClick,
  onResolveClick,
  isResolved,
}: {
  onReplyClick?: () => void;
  onResolveClick?: () => void;
  isResolved?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <Button
        className="size-7 rounded-sm"
        onClick={onReplyClick}
        size={'icon'}
        title="Reply to comment"
        variant={'ghost'}
      >
        <Icons.reply />
      </Button>
      <Button
        className={`size-7 rounded-sm ${isResolved ? 'bg-green-100 text-green-600' : ''}`}
        onClick={onResolveClick}
        size={'icon'}
        title={isResolved ? 'Mark as unresolved' : 'Mark as resolved'}
        variant={isResolved ? 'default' : 'ghost'}
      >
        <Icons.check />
      </Button>
      <Button
        className="size-7 rounded-sm"
        size={'icon'}
        title="Add reaction"
        variant={'ghost'}
      >
        <Icons.emojiPlus />
      </Button>
      <Button
        className="size-7 rounded-sm"
        size={'icon'}
        title="More options"
        variant={'ghost'}
      >
        <Icons.ellipsis />
      </Button>
    </div>
  );
}
