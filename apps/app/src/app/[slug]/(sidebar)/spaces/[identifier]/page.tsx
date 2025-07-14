import { Sidebar, SidebarContent } from '@coordinize/ui/components/sidebar';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { SpaceHeader } from '@/components/features/space/space-header';
import { SpacePublishedPostsList } from '@/components/features/space/space-posts-list';
import { SpaceSidebar } from '@/components/features/space/space-sidebar';
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server';

export default async function SpacesPage({
  params,
}: {
  params: Promise<{ identifier: string }>;
}) {
  const { identifier } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.space.getSpaceWithPublishedPosts.queryOptions({ identifier })
  );

  return (
    <HydrateClient>
      <div className="flex h-full w-full">
        <div className="flex-1">
          <div className="flex h-full flex-col overflow-hidden rounded border bg-background">
            <SpaceHeader identifier={identifier} />
            <div className="flex-1 overflow-auto">
              <ActivitySection>
                <SpacePublishedPostsList identifier={identifier} />
              </ActivitySection>
            </div>
          </div>
        </div>

        <Sidebar
          className="border-none"
          collapsible="offcanvas"
          side="right"
          variant="sidebar"
        >
          <SidebarContent>
            <SpaceSidebar identifier={identifier} />
          </SidebarContent>
        </Sidebar>
      </div>
    </HydrateClient>
  );
}
