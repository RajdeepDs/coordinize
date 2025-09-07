import { SidebarProvider } from "@coordinize/ui/components/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar/app-sidebar";
import { SidebarLayout } from "@/components/layout/app-sidebar/sidebar-layout";
import { batchPrefetch, HydrateClient, trpc } from "@/trpc/server";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  batchPrefetch([
    trpc.user.me.queryOptions(),
    trpc.workspace.current.queryOptions(),
    trpc.space.getAll.queryOptions(),
    trpc.post.getAllPublished.queryOptions(),
    trpc.favorite.getFavorites.queryOptions(),
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
