"use client";

import { useSlidingSidebarStore } from "@/store/sliding-sidebar";
import { cn } from "@coordinize/ui/lib/utils";

interface ActivitySectionProps {
  readonly children: React.ReactNode;
}

export function ActivitySection({ children }: ActivitySectionProps) {
  const { isOpen } = useSlidingSidebarStore();
  return (
    <div
      className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isOpen && "pr-52",
      )}
    >
      <div className="h-full px-40">{children}</div>
    </div>
  );
}
