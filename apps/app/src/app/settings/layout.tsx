import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@coordinize/ui/components/sidebar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

interface SettingsLayoutProps {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
