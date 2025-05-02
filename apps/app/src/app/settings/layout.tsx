import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SettingsSidebar } from "@/components/settings-sidebar";
import { settingsSidebarNav } from "@/config/navigation";
import {
  SidebarInset,
  SidebarProvider,
} from "@coordinize/ui/components/sidebar";

interface SettingsLayoutProps {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const settingsNav = settingsSidebarNav;
  return (
    <SidebarProvider>
      <SettingsSidebar nav={settingsNav} />
      <SidebarInset className="px-5 py-14 xl:px-60">{children}</SidebarInset>
    </SidebarProvider>
  );
}
