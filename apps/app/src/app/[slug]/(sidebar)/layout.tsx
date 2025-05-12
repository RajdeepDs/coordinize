import type { Metadata } from "next";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";
import { HydrateClient, batchPrefetch, trpc } from "@/trpc/server";
import { SidebarProvider } from "@coordinize/ui/components/sidebar";

export const metadata: Metadata = {
  title: "Home | Coordinize",
};

export default async function AppLayout({
  children,
}: { children: React.ReactNode }) {
  batchPrefetch([
    trpc.user.me.queryOptions(),
    trpc.workspace.current.queryOptions(),
  ]);

  return (
    <HydrateClient>
      <SidebarProvider>
        <AppSidebar />
        <SidebarLayout>{children}</SidebarLayout>
      </SidebarProvider>
    </HydrateClient>
  );
}
