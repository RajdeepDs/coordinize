import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { SettingsSidebar } from "@/components/settings-sidebar";
import { settingsSidebarNav } from "@/config/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@coordinize/ui/components/sidebar";
import { Icons } from "@coordinize/ui/lib/icons";

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
      <SidebarInset>
        <header className="flex h-10 items-center gap-2 border-b px-4 sm:hidden">
          <SidebarTrigger />
          <Link href={"/"} className="flex items-center gap-2">
            <Icons.chevronLeft className="size-5 text-muted-foreground" />
            Settings
          </Link>
        </header>
        <div className="px-5 py-14 xl:px-60">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
