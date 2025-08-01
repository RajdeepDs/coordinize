'use client';

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
import { cn } from '@coordinize/ui/lib/utils';
import { useState } from 'react';
import { useReactions } from '@/hooks/use-reactions';
import { useUserQuery } from '@/hooks/use-user';
import { getTooltipText } from '@/utils/get-reaction-tooltip';

interface EmojiReactionsProps {
  postId: string;
}

export function EmojiReactions({ postId }: EmojiReactionsProps) {
  const { reactions, toggleReaction, isToggling } = useReactions(postId);
  const { data: currentUser } = useUserQuery();
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleEmojiSelect = ({ emoji }: { emoji: string }) => {
    toggleReaction(emoji);
    setIsPickerOpen(false);
  };

  const handleReactionClick = (emoji: string) => {
    toggleReaction(emoji);
  };

  return (
    <div className="flex items-center gap-2">
      {reactions.map((reaction) => (
        <Button
          className={cn(
            'focus:bg-accent',
            'h-7 rounded-full bg-background-200 px-2 font-normal text-sm ring ring-ui-gray-400 transition-colors',
            'hover:bg-ui-gray-100'
          )}
          disabled={isToggling}
          key={reaction.emoji}
          onClick={() => handleReactionClick(reaction.emoji)}
          size="sm"
          tooltip={getTooltipText(reaction, currentUser)}
          variant="secondary"
        >
          <span>{reaction.emoji}</span>
          <span className="text-xs tabular-nums">{reaction.count}</span>
        </Button>
      ))}

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
          <EmojiPicker className="h-[342px]" onEmojiSelect={handleEmojiSelect}>
            <EmojiPickerSearch />
            <EmojiPickerContent />
          </EmojiPicker>
        </PopoverContent>
      </Popover>
    </div>
  );
}
