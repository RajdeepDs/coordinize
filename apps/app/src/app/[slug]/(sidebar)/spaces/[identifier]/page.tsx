import { ActivitySection } from '@/components/features/activity/activity-section';
import { SpaceHeader } from '@/components/features/space/space-header';
import { SpacePublishedPostsList } from '@/components/features/space/space-posts-list';
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
      <div className="flex h-full w-full gap-1.5 overflow-hidden">
        <div className="flex-1 rounded border bg-background">
          <SpaceHeader identifier={identifier} />
          <ActivitySection>
            <SpacePublishedPostsList identifier={identifier} />
          </ActivitySection>
        </div>
      </div>
    </HydrateClient>
  );
}
