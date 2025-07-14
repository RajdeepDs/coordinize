import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function useSpacesQuery() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.space.getAll.queryOptions());
}

export function useSpaceWithPublishedPostsQuery(identifier: string) {
  const trpc = useTRPC();
  return useSuspenseQuery(
    trpc.space.getSpaceWithPublishedPosts.queryOptions({ identifier })
  );
}
