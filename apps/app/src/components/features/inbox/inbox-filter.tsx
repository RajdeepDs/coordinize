"use client";

import { Button } from "@coordinize/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@coordinize/ui/components/dropdown-menu";
import { Label } from "@coordinize/ui/components/label";
import { Icons } from "@coordinize/ui/lib/icons";
import { useMarkAllAsRead } from "@/hooks/use-notifications";

type InboxFilterOption = {
  icon?: (typeof Icons)[keyof typeof Icons];
  label: string;
  value?: string;
  onClick?: () => void;
};

type InboxFilterProps = {
  currentFilter: "all" | "unread" | "archived";
  onFilterChange: (filter: "all" | "unread" | "archived") => void;
};

export function InboxFilter({
  currentFilter,
  onFilterChange,
}: InboxFilterProps) {
  const { mutate: markAllAsRead, isPending: isMarkingAllAsRead } =
    useMarkAllAsRead();

  const filterOptions: InboxFilterOption[] = [
    {
      label: "All notifications",
      icon: Icons.inbox,
      value: "all",
      onClick: () => onFilterChange("all"),
    },
    {
      label: "Unread",
      icon: Icons.bell,
      value: "unread",
      onClick: () => onFilterChange("unread"),
    },
    {
      label: "Archived",
      icon: Icons.archive,
      value: "archived",
      onClick: () => onFilterChange("archived"),
    },
  ];

  const actionOptions: InboxFilterOption[] = [
    {
      label: "Mark all as read",
      icon: Icons.resolve,
      onClick: () => markAllAsRead(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-0">
        <Button
          className="size-7 rounded-sm text-muted-foreground"
          size={"icon"}
          tooltip="Filter notifications"
          tooltipShortcut="F"
          variant={"ghost"}
        >
          <Icons.listFilter />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 overflow-hidden rounded-lg p-0"
      >
        <div className="p-1">
          <Label className="p-1 font-normal text-ui-gray-900">Filter</Label>
          {filterOptions.map((item) => (
            <DropdownMenuItem
              className="flex items-center"
              key={item.value}
              onClick={item.onClick}
            >
              {item.icon && (
                <item.icon className="size-4 text-muted-foreground" />
              )}
              <span>{item.label}</span>
              {currentFilter === item.value && (
                <Icons.check className="ml-auto size-4" />
              )}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <Label className="p-1 font-normal text-ui-gray-900">Actions</Label>
          {actionOptions.map((item) => (
            <DropdownMenuItem
              className="flex items-center"
              disabled={isMarkingAllAsRead}
              key={item.label}
              onClick={item.onClick}
            >
              {item.icon && (
                <item.icon className="size-4 text-muted-foreground" />
              )}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
