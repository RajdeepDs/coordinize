import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function usePublishedPostsQuery() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.post.getAllPublished.queryOptions());
}
