"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";
import { useState } from "react";

import { cn } from "@coordinize/ui/lib/utils";
import { KeyboardShortcut } from "./keyboard-shortcut";

interface TooltipProps {
  label?: string | React.ReactNode;
  shortcut?: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  asChild?: boolean;
  disableHoverableContent?: boolean;
  hideWhenDetached?: boolean;
  hideOnKeyboardFocus?: boolean;
  sideOffset?: number;
  alignOffset?: number;
}

function Tooltip({
  label,
  children,
  side = "top",
  align = "center",
  asChild = true,
  shortcut,
  disableHoverableContent = false,
  hideWhenDetached = true,
  hideOnKeyboardFocus = true,
  sideOffset = 5,
  alignOffset = 5,
  ...props
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      disableHoverableContent={disableHoverableContent}
      open={open}
      onOpenChange={setOpen}
      {...props}
    >
      <TooltipPrimitive.Trigger
        data-slot="tooltip-trigger"
        asChild={asChild}
        onFocus={(e) => {
          if (hideOnKeyboardFocus) {
            e.preventDefault();
          }
        }}
      >
        {children}
      </TooltipPrimitive.Trigger>
      {(label || shortcut) && (
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            data-slot="tooltip-content"
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            hideWhenDetached={hideWhenDetached}
            className={cn(
              "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 flex h-8 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in flex-row items-center gap-2 text-balance rounded-md border bg-primary px-3 py-1 text-primary-foreground text-xs data-[state=closed]:animate-out dark:bg-ui-gray-100 dark:text-foreground",
              {
                "px-2": !shortcut,
                "px-1.5": !!shortcut && !!label,
                "px-1": !!shortcut && !label,
              },
            )}
          >
            {label}
            {shortcut && <KeyboardShortcut shortcut={shortcut} />}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      )}
    </TooltipPrimitive.Root>
  );
}

function TooltipProvider({
  delayDuration,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={600}
      {...props}
    />
  );
}

export { Tooltip, TooltipProvider };
