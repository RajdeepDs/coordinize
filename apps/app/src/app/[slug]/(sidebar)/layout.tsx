import type { Metadata } from "next";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";
import { SidebarProvider } from "@coordinize/ui/components/sidebar";

export const metadata: Metadata = {
  title: "Home | Coordinize",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarLayout>{children}</SidebarLayout>
    </SidebarProvider>
  );
}
