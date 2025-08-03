'use client';

import type { Comment, User } from '@coordinize/database/db';
import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { MarkdownEditor } from '@/components/features/markdown-editor';
import AvatarStatus from '@/components/ui/avatar-status';
import { formatDate } from '@/utils/format-date';
import { CommentProvider, useComment } from './comment-context';

interface CommentItemProps {
  comment: Comment & {
    author: Partial<User>;
  };
}

export function CommentWrapper({ comment }: CommentItemProps) {
  return (
    <CommentProvider>
      <CommentItem comment={comment} />
    </CommentProvider>
  );
}

export function CommentItem({ comment }: CommentItemProps) {
  const { activeReplyId, toggleReply } = useComment();

  const showReply = activeReplyId === comment.id;

  const handleReplyClick = () => {
    toggleReply(comment.id);
  };

  return (
    <div className={'group relative w-full rounded-md border'}>
      <div className="space-y-2 p-3">
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
      {/* Child comments or Reply section*/}
      <div
        className={cn(
          'overflow-hidden border-t transition-[max-height,opacity] duration-300 ease-in-out',
          showReply ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="flex items-center gap-2 p-3">
          <div className="prose prose-sm max-w-none flex-1 text-foreground">
            <MarkdownEditor
              containerClasses="px-0"
              placeholder="Write a reply..."
            />
          </div>

          <Button
            className="mt-auto size-8 disabled:border disabled:border-ui-gray-500 disabled:bg-ui-gray-400 disabled:text-ui-gray-1000"
            size="sm"
            type="submit"
            variant="default"
          >
            <Icons.arrowUp />
          </Button>
        </div>
      </div>
      <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
        <CommentOptions onReplyClick={handleReplyClick} />
      </div>
    </div>
  );
}

function CommentOptions({
  onReplyClick,
  onResolveClick,
  isResolved,
}: {
  onReplyClick: () => void;
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
