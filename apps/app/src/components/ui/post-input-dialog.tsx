"use client";

import { useState } from "react";

import { Button } from "@coordinize/ui/components/button";
import { Label } from "@coordinize/ui/components/label";
import { Icons } from "@coordinize/ui/lib/icons";
import { cn } from "@coordinize/ui/lib/utils";

const suggestions = [
  {
    icon: "megaphone",
    label: "Make an announcement",
  },
  {
    icon: "pen",
    label: "Write a project undate",
  },
] as const;

export function PostInputDialog() {
  const [openSuggestions, setOpenSuggestions] = useState(true);

  const handleOpenSuggestions = () => {
    setOpenSuggestions(!openSuggestions);
  };

  return (
    <div className="mt-16 w-full rounded-lg bg-muted">
      <div className="flex items-center justify-between rounded-md border bg-white/50 p-2">
        <div className="flex items-center gap-2 ">
          <div className="size-7 rounded-full border bg-muted" />
          <Label className="font-normal text-muted-foreground">
            What do you want to share?
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="size-6 rounded text-muted-foreground"
          >
            <Icons.maximize className="size-4" />
          </Button>
          <Button size={"sm"} className="font-normal">
            Create
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col gap-2 overflow-hidden p-2 transition-all duration-300 ease-in-out",
          openSuggestions
            ? "max-h-[200px] opacity-100"
            : "max-h-0 py-0 opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <Label className="font-normal text-muted-foreground">
            Suggestions
          </Label>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="size-6 rounded text-muted-foreground"
            onClick={handleOpenSuggestions}
          >
            <Icons.x className="size-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {suggestions.map((suggestion) => {
            const Icon = Icons[suggestion.icon as keyof typeof Icons];
            return (
              <div
                key={suggestion.label}
                className="flex w-fit items-center gap-2 rounded-md bg-[#E6E6E6] px-2 py-1.5"
              >
                <Icon className="size-4 text-muted-foreground" />
                <Label className="font-normal text-primary">
                  {suggestion.label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
