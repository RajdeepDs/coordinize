import type React from "react";

import { Button } from "@coordinize/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@coordinize/ui/components/dropdown-menu";
import { Tooltip } from "@coordinize/ui/components/tooltip";
import { Icons } from "@coordinize/ui/lib/icons";
import { cn } from "@coordinize/ui/lib/utils";

export interface MenuITems {
  label: string;
  type: "item";
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof Icons;
}

interface BubbleMenuDropdownProps {
  items: MenuITems[];
  menuIcon: React.ReactNode;
  tooltip?: string;
}

export function BubbleMenuDropdown({
  items,
  menuIcon,
  tooltip,
}: BubbleMenuDropdownProps) {
  return (
    <DropdownMenu modal={true}>
      <Tooltip label={tooltip}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={cn("size-6 rounded")}
          >
            {menuIcon}
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent
        sideOffset={8}
        className={cn(
          "focus:outline-none",
          "w-[12rem] rounded-lg border bg-background p-1 text-primary shadow-md",
        )}
      >
        {items.map((item) => {
          const Icon = Icons[item.icon];

          return (
            <DropdownMenuItem
              key={item.label}
              onClick={item.onClick}
              className={cn("flex items-center justify-between")}
            >
              <div className="flex items-center gap-2">
                <Icon />
                <span>{item.label}</span>
              </div>
              {item.isActive() ? <Icons.check /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
