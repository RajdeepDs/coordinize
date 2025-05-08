import type { Metadata } from "next";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@coordinize/ui/components/sidebar";

export const metadata: Metadata = {
  title: "Home | Coordinize",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full flex-col bg-sidebar pr-2 pb-2 pl-2">
        <AppHeader />
        <SidebarInset className="rounded border p-2">{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
