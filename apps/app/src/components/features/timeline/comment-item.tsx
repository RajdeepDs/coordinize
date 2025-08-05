'use client';

import type { Comment, User } from '@coordinize/database/db';
import { Button } from '@coordinize/ui/components/button';
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from '@coordinize/ui/components/emoji-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@coordinize/ui/components/popover';
import { Icons } from '@coordinize/ui/lib/icons';
import { useState } from 'react';
import { CommentEmojiReactions } from '@/components/features/comment/comment-emoji-reactions';
import { MarkdownEditor } from '@/components/features/markdown-editor';
import {
  CommentProvider,
  useComment,
} from '@/components/features/timeline/comment-context';
import { CommentForm } from '@/components/features/timeline/comment-form';
import AvatarStatus from '@/components/ui/avatar-status';
import { useCommentReactions } from '@/hooks/use-comment-reactions';
import { formatDate } from '@/utils/format-date';

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
  const { reactions } = useCommentReactions(comment.id);
  const hasReactions = reactions.length > 0;

  return (
    <div className="group relative flex flex-col gap-y-2 p-3 ">
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
      <div className="prose prose-sm mb-3 max-w-none text-foreground">
        <MarkdownEditor
          containerClasses="px-0 text-[15px]"
          content={comment.content}
          editable={false}
        />
      </div>
      {/* Comment Reactions - only show if there are reactions */}
      {hasReactions && <CommentEmojiReactions commentId={comment.id} />}
      {/* Comment Options */}
      <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
        <CommentOptions
          commentId={comment.id}
          isReply={isReply}
          showEmojiButton={!hasReactions}
        />
      </div>
    </div>
  );
}

function CommentOptions({
  commentId,
  isReply = false,
  showEmojiButton = false,
}: {
  commentId: string;
  isReply?: boolean;
  showEmojiButton?: boolean;
}) {
  const { toggleReply } = useComment();
  const { toggleReaction, isToggling } = useCommentReactions(commentId);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleReplyClick = () => {
    toggleReply(commentId);
  };

  const handleEmojiSelect = ({ emoji }: { emoji: string }) => {
    toggleReaction(emoji);
    setIsPickerOpen(false);
  };

  return (
    <div className="flex items-center gap-1">
      {!isReply && (
        <Button
          className="size-7 rounded-sm"
          onClick={handleReplyClick}
          size={'icon'}
          title="Reply to comment"
          tooltip="Reply to comment"
          variant={'ghost'}
        >
          <Icons.reply />
        </Button>
      )}
      {/* Emoji reaction button - show when there are no reactions */}
      {showEmojiButton && (
        <Popover onOpenChange={setIsPickerOpen} open={isPickerOpen}>
          <PopoverTrigger asChild>
            <Button
              className="size-7 rounded-sm text-ui-gray-900"
              disabled={isToggling}
              size="icon"
              tooltip="Add a reaction"
              variant="ghost"
            >
              <Icons.emojiPlus size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <EmojiPicker
              className="h-[342px]"
              onEmojiSelect={handleEmojiSelect}
            >
              <EmojiPickerSearch />
              <EmojiPickerContent />
            </EmojiPicker>
          </PopoverContent>
        </Popover>
      )}
      <Button
        className={'hidden size-7 rounded-sm '}
        size={'icon'}
        title="Mark as resolved"
        tooltip="Mark as resolved"
        variant={'ghost'}
      >
        <Icons.check />
      </Button>
      <Button
        className="hidden size-7 rounded-sm"
        size={'icon'}
        title="More options"
        tooltip="More options"
        variant={'ghost'}
      >
        <Icons.ellipsis />
      </Button>
    </div>
  );
}
