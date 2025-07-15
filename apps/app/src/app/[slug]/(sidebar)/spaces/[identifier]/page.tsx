import { Button } from '@coordinize/ui/components/button';
import { Sidebar, SidebarContent } from '@coordinize/ui/components/sidebar';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import { ActivitySection } from '@/components/features/activity/activity-section';
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
        <div className="flex-1">
          <div className="flex h-full flex-col overflow-hidden rounded border bg-background">
            <PageHeader
              breadcrumb={[
                {
                  icon: <Icons.space size={16} />,
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
              leftContent={
                <Button
                  className={cn('size-7 rounded-sm text-muted-foreground')}
                  size={'icon'}
                  tooltip="Add to your favorites"
                  variant={'ghost'}
                >
                  <Icons.star />
                </Button>
              }
              showRightSidebarTrigger={true}
            />
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
