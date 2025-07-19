import type { TimelineAction, TimelineEvent } from '@coordinize/database/db';

export interface CommentAuthor {
  id: string;
  name: string;
  image: string | null;
}

export interface CommentReply {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  edited: boolean;
  authorId: string;
  postId: string;
  parentId: string | null;
  author: CommentAuthor;
}

export interface TimelineComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  edited: boolean;
  authorId: string;
  postId: string;
  parentId: string | null;
  author: CommentAuthor;
  replies?: (CommentReply & { replies?: CommentReply[] })[];
}

export interface EventWithComment extends TimelineEvent {
  createdAt: Date;
  comment?: TimelineComment;
}

export interface TimelineEventDisplay {
  id: string;
  action: TimelineAction;
  message: string;
  time: Date;
  actor: {
    id: string;
    name: string;
    image: string | null;
  } | null;
  metadata?: Record<string, unknown>;
  comment?: {
    id: string;
    content: string;
    createdAt: Date;
    author: {
      id: string;
      name: string;
      image: string | null;
    };
  } | null;
}

export const TimelineEventMessages: Record<
  TimelineAction,
  (event: TimelineEvent) => string
> = {
  UPDATED_TITLE: (event) => {
    const metadata = event.metadata as {
      oldTitle?: string;
      newTitle?: string;
    } | null;
    return `changed the title from ${metadata?.oldTitle} to ${metadata?.newTitle}`;
  },
  MOVED_SPACE: (event) => {
    const metadata = event.metadata as {
      oldSpaceName?: string;
      newSpaceName?: string;
    } | null;

    const oldSpaceName = metadata?.oldSpaceName;
    const newSpaceName = metadata?.newSpaceName;

    return `moved this post from ${oldSpaceName} to ${newSpaceName}`;
  },
  RESOLVED: () => 'marked this post as resolved',
  REOPENED: () => 're-opened this post',
  COMMENTED: () => 'commented on this post',
};
