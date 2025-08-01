import { Sidebar, SidebarContent } from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { ActivitySection } from '@/components/features/activity/activity-section';
import { SpaceFavorite } from '@/components/features/space/space-favorite';
import { SpacePublishedPostsList } from '@/components/features/space/space-posts-list';
import { SpaceSidebar } from '@/components/features/space/space-sidebar';
import { PageHeader } from '@/components/layout/page-header';
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

  const space = queryClient.getQueryData(
    trpc.space.getSpaceWithPublishedPosts.queryOptions({ identifier }).queryKey
  );

  return (
    <HydrateClient>
      <div className="flex h-full w-full">
        <div className="flex h-full flex-1 flex-col overflow-hidden rounded-md border bg-background">
          <PageHeader
            breadcrumb={[
              {
                icon: <Icons.space className="text-ui-gray-900" size={16} />,
                label: 'Spaces',
              },
              {
                icon: space?.icon ? (
                  <span className="text-sm">{space.icon}</span>
                ) : (
                  <Icons.space size={16} />
                ),
                label: space?.name || identifier,
              },
            ]}
            leftContent={<SpaceFavorite identifier={identifier} />}
            showRightSidebarTrigger={true}
          />
          <div className="flex-1 overflow-hidden">
            <ActivitySection>
              <SpacePublishedPostsList identifier={identifier} />
            </ActivitySection>
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
