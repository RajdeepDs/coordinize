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
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const { slug } = await params;

  const settingsNav = settingsSidebarNav(slug);
  return (
    <SidebarProvider>
      <SettingsSidebar nav={settingsNav} />
      <SidebarInset className="px-5 py-14 xl:px-60">{children}</SidebarInset>
    </SidebarProvider>
  );
}
