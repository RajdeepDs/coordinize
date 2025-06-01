import type { Metadata } from "next";

import { AppSidebar } from "@/components/sidebar";
import { SidebarLayout } from "@/components/sidebar/sidebar-layout";
import { HydrateClient, batchPrefetch, trpc } from "@/trpc/server";
import { SidebarProvider } from "@coordinize/ui/components/sidebar";

export const metadata: Metadata = {
  title: "Home",
};

export default async function AppLayout({
  children,
}: { children: React.ReactNode }) {
  batchPrefetch([
    trpc.user.me.queryOptions(),
    trpc.workspace.current.queryOptions(),
    trpc.space.getAll.queryOptions(),
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
