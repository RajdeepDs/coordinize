"use client";

import { Sidebar, SidebarHeader } from "@coordinize/ui/components/sidebar";
import { TeamSwitcher } from "./team-switcher";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props} className="border-none p-0">
      <SidebarHeader className="flex items-center">
        <TeamSwitcher />
      </SidebarHeader>
    </Sidebar>
  );
}
