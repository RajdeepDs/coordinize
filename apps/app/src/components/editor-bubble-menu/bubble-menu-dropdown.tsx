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
  type: string;
  isActive: () => boolean;
  onClick: () => void;
  icon: string;
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
    <DropdownMenu>
      <Tooltip label={tooltip}>
        <DropdownMenuTrigger className="focus-visible:ring-0" asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={cn("size-min h-6 gap-0.5 rounded px-1")}
          >
            {menuIcon}
            <Icons.chevronDown />
          </Button>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent
        sideOffset={4}
        align="start"
        alignOffset={0}
        className={cn(
          "z-[100] focus:outline-none",
          "w-[12rem] rounded-lg border bg-background p-1 text-primary shadow-md",
        )}
      >
        {items.map((item) => {
          // Get the icon component or use a generic component
          const iconKey = item.icon as keyof typeof Icons;
          const IconComponent =
            Icons[iconKey] || (() => <div className="h-4 w-4" />);

          return (
            <DropdownMenuItem
              key={item.label}
              onClick={item.onClick}
              className={cn("flex items-center justify-between")}
            >
              <div className="flex items-center gap-2">
                <IconComponent />
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
