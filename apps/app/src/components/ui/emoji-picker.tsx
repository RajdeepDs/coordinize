"use client";

import { useState } from "react";

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

export function EmojiPickerPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState("");

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
            setIsOpen(false);
            setEmoji(emoji);
          }}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}
