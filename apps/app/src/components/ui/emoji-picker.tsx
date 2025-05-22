"use client";

import { useState } from "react";

import { useStatusEmoji } from "@/hooks/use-user";
import { Button } from "@coordinize/ui/components/button";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from "@coordinize/ui/components/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@coordinize/ui/components/popover";
import { Icons } from "@coordinize/ui/lib/icons";

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
          variant={"ghost"}
          size={"icon"}
          className="text-muted-foreground"
        >
          {emoji ? emoji : <Icons.emojiPlus />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="start">
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
