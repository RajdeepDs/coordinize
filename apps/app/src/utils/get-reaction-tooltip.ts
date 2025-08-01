import type { User } from '@coordinize/database/db';

type Reaction = {
  emoji: string;
  count: number;
  users: { id: string; name: string; image: string | null }[];
  hasReacted: boolean;
};

export const getTooltipText = (
  reaction: Reaction,
  currentUser: User | null
): string => {
  if (reaction.hasReacted) {
    return 'You reacted';
  }

  if (reaction.users.length === 0) {
    return 'Click to react';
  }

  // Filter out current user to show only other users who reacted
  const otherUsers = reaction.users
    .filter((user) => user.id !== currentUser?.id)
    .map((user) => user.name);

  if (otherUsers.length === 0) {
    return 'Click to react';
  }

  if (otherUsers.length === 1) {
    return `${otherUsers[0]} reacted`;
  }

  if (otherUsers.length === 2) {
    return `${otherUsers[0]} and ${otherUsers[1]} reacted`;
  }

  if (otherUsers.length === 3) {
    return `${otherUsers[0]}, ${otherUsers[1]}, and ${otherUsers[2]} reacted`;
  }

  return `${otherUsers[0]}, ${otherUsers[1]}, and ${otherUsers.length - 2} others reacted`;
};
