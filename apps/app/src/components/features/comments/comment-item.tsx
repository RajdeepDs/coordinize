'use client';

import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { useDeleteComment, useUpdateComment } from '@/hooks/use-comments';
import { MarkdownEditor } from '../markdown-editor';
import { CommentForm } from './comment-form';

interface CommentItemProps {
  comment: {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    edited: boolean;
    authorId: string;
    postId: string;
    parentId?: string | null;
    author: {
      id: string;
      name: string;
      image?: string | null;
    };
    replies?: CommentItemProps['comment'][];
  };
  currentUserId?: string;
  onReply?: (commentId: string) => void;
  depth?: number;
}

export function CommentItem({
  comment,
  currentUserId,
  onReply,
  depth = 0,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const { mutate: updateComment } = useUpdateComment(comment.postId);
  const { mutate: deleteComment } = useDeleteComment(comment.postId);

  const isAuthor = currentUserId === comment.authorId;
  const maxDepth = 3; // Maximum nesting depth

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      updateComment({
        id: comment.id,
        content: editContent,
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment({ id: comment.id });
    }
  };

  const handleReply = () => {
    if (depth < maxDepth) {
      setShowReplyForm(true);
    } else {
      onReply?.(comment.id);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  return (
    <div className={cn('-ms-1 flex gap-3', depth > 0 && 'ml-6')}>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-foreground">
            {comment.author.name}
          </span>
          <span className="text-muted-foreground">
            {timeAgo}
            {comment.edited && <span className="ml-1">(edited)</span>}
          </span>
        </div>

        {isEditing ? (
          <div className="space-y-2">
            <MarkdownEditor
              containerClasses="px-2 py-1 border rounded-md"
              content={editContent}
              onChangeDebounced={(value) => setEditContent(value)}
              placeholder="Edit your comment..."
            />
            <div className="flex gap-2">
              <Button onClick={handleSaveEdit} size="sm">
                Save
              </Button>
              <Button onClick={handleCancelEdit} size="sm" variant="ghost">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-foreground">
            <MarkdownEditor
              containerClasses="px-0"
              content={comment.content}
              editable={false}
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Button
            className="h-auto p-0 hover:bg-transparent hover:text-primary"
            onClick={handleReply}
            size="sm"
            variant="ghost"
          >
            Add a reply
          </Button>

          {isAuthor && (
            <>
              <Button
                className="h-auto p-0 hover:bg-transparent hover:text-primary"
                onClick={handleEdit}
                size="sm"
                variant="ghost"
              >
                <Icons.pen className="mr-1 h-3 w-3" />
                Edit
              </Button>
              <Button
                className="h-auto p-0 hover:bg-transparent hover:text-destructive"
                onClick={handleDelete}
                size="sm"
                variant="ghost"
              >
                <Icons.trash className="mr-1 h-3 w-3" />
                Delete
              </Button>
            </>
          )}
        </div>

        {showReplyForm && (
          <CommentForm
            onCancel={() => setShowReplyForm(false)}
            onSuccess={() => setShowReplyForm(false)}
            parentId={comment.id}
            placeholder="Write a reply..."
            postId={comment.postId}
          />
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem
                comment={reply}
                currentUserId={currentUserId}
                depth={depth + 1}
                key={reply.id}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
