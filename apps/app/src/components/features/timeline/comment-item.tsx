'use client';

import type { Comment, User } from '@coordinize/database/db';
import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import { MarkdownEditor } from '@/components/features/markdown-editor';
import AvatarStatus from '@/components/ui/avatar-status';
import { formatDate } from '@/utils/format-date';
import { CommentForm } from '../comments/comment-form';
import { CommentProvider, useComment } from './comment-context';

type CommentWithAuthor = Comment & {
  author: Partial<User>;
  replies?: CommentWithAuthor[];
};

interface CommentItemProps {
  comment: CommentWithAuthor;
  isReply?: boolean;
}

interface CommentContainerProps {
  comment: CommentWithAuthor;
}

export function CommentWrapper({ comment }: CommentContainerProps) {
  return (
    <CommentProvider>
      <CommentContainer comment={comment} />
    </CommentProvider>
  );
}

export function CommentContainer({ comment }: CommentContainerProps) {
  const { activeReplyId } = useComment();

  const showReply = activeReplyId === comment.id;

  return (
    <div className="w-full divide-y rounded-md border border-ui-gray-200">
      <CommentItem comment={comment} />
      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="divide-y">
          {comment.replies.map((reply) => (
            <CommentItem comment={reply} isReply={true} key={reply.id} />
          ))}
        </div>
      )}
      {/* Reply to Comment Form */}
      {showReply && (
        <CommentForm
          parentId={comment.id}
          postId={comment.postId}
          variant="inline"
        />
      )}
    </div>
  );
}

export function CommentItem({ comment, isReply }: CommentItemProps) {
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
          containerClasses="px-0 text-[15px]"
          content={comment.content}
          editable={false}
        />
      </div>
      {/* Comment Options */}
      <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
        <CommentOptions commentId={comment.id} isReply={isReply} />
      </div>
    </div>
  );
}

function CommentOptions({
  commentId,
  isReply = false,
}: {
  commentId: string;
  isReply?: boolean;
}) {
  const { toggleReply } = useComment();

  const handleReplyClick = () => {
    toggleReply(commentId);
  };

  return (
    <div className="flex items-center gap-1">
      {!isReply && (
        <Button
          className="size-7 rounded-sm"
          onClick={handleReplyClick}
          size={'icon'}
          title="Reply to comment"
          variant={'ghost'}
        >
          <Icons.reply />
        </Button>
      )}
      <Button
        className={'size-7 rounded-sm '}
        size={'icon'}
        title="Mark as resolved"
        variant={'ghost'}
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
