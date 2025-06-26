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
import { useState } from 'react';
import { useStatusEmoji } from '@/hooks/use-user';

interface EmojiPickerPopoverProps {
  statusEmoji: string | null;
}

export function EmojiPickerPopover({ statusEmoji }: EmojiPickerPopoverProps) {
  const statusEmojiMutation = useStatusEmoji();

  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState(statusEmoji);

  function handleUpdate(emoji: string) {
    setIsOpen(false);
    setEmoji(emoji);
    if (statusEmoji !== emoji) {
      statusEmojiMutation.mutate({ statusEmoji: emoji });
    }
  }

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild className="focus-visible:ring-0">
        <Button
          className="size-7 rounded-sm text-muted-foreground"
          size={'icon'}
          variant={'ghost'}
        >
          {emoji ? emoji : <Icons.emojiPlus />}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-0">
        <EmojiPicker
          className="h-[342px]"
          onEmojiSelect={({ emoji }) => {
            handleUpdate(emoji);
          }}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}
