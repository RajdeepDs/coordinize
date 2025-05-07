import type { Metadata } from "next";

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
      <div className="flex w-full flex-col bg-sidebar">
        <header className="flex h-10 items-center">Header</header>
        <SidebarInset className="rounded border">{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
