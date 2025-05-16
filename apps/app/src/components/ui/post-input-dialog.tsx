"use client";

import { useState } from "react";

import { Button } from "@coordinize/ui/components/button";
import { Input } from "@coordinize/ui/components/input";
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

interface PostInputDialogProps {
  readonly maximize: boolean;
  readonly onMaximize: (maximize: boolean) => void;
}

export function PostInputDialog({
  maximize,
  onMaximize,
}: PostInputDialogProps) {
  const [openSuggestions, setOpenSuggestions] = useState(true);

  const handleOpenSuggestions = () => {
    setOpenSuggestions(!openSuggestions);
  };

  const handleMaximize = () => {
    onMaximize(!maximize);
  };

  return (
    <div className="mt-16 w-full rounded-lg bg-muted">
      {/* The input field to create posts */}
      <div
        className={cn(
          "relative flex items-center justify-between rounded-md border bg-white/50 p-2",
          maximize ? "h-full w-full flex-col" : "gap-4",
        )}
      >
        <div
          className={cn(
            "flex items-center",
            maximize ? "w-full flex-col gap-4" : "flex-1 gap-2",
          )}
        >
          {!maximize && (
            <div className="size-7 shrink-0 rounded-full border bg-muted" />
          )}
          <div className={cn("w-full", !maximize && "flex items-center gap-2")}>
            {maximize ? (
              <>
                <Input
                  placeholder="Post title"
                  className="border-none shadow-none focus-visible:ring-0"
                />
                <textarea
                  className="min-h-[200px] w-full resize-none rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none"
                  placeholder="Write your thoughts here..."
                />
              </>
            ) : (
              <Label className="shrink-0 font-normal text-muted-foreground">
                What do you want to share?
              </Label>
            )}
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-2",
            maximize && "w-full justify-end",
          )}
        >
          {!maximize ? (
            <Button
              size={"icon"}
              variant={"ghost"}
              className="size-6 rounded text-muted-foreground"
              onClick={handleMaximize}
            >
              <Icons.maximize className="size-4" />
            </Button>
          ) : (
            <Button size={"sm"} variant={"secondary"} className="font-normal">
              Save as draft
            </Button>
          )}
          <Button size={"sm"} className="font-normal">
            Create
          </Button>
        </div>
        {maximize && (
          <Button
            size={"icon"}
            variant={"ghost"}
            className="absolute right-2 size-6 rounded text-muted-foreground"
            onClick={handleMaximize}
          >
            <Icons.x className="size-4" />
          </Button>
        )}
      </div>
      {/* Suggestions */}
      <div
        className={cn(
          "flex flex-col gap-2 overflow-hidden p-2 transition-all duration-300 ease-in-out",
          !maximize && openSuggestions
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
