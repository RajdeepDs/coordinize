"use client";

import { SidebarInset, useSidebar } from "@coordinize/ui/components/sidebar";
import { cn } from "@coordinize/ui/lib/utils";
import { AppHeader } from "./app-header";

interface SidebarLayoutProps {
  readonly children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const { isMobile, state } = useSidebar();
  return (
    <div
      className={cn("flex w-full flex-col bg-sidebar pr-2 pb-2", {
        "pl-2": isMobile || state === "collapsed",
      })}
    >
      <AppHeader />
      <SidebarInset className="rounded border">{children}</SidebarInset>
    </div>
  );
}
