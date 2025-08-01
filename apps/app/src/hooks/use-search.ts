'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function useSearchPosts(query: string, enabled: boolean) {
  const trpc = useTRPC();
  return useQuery({
    ...trpc.post.search.queryOptions({ query }),
    enabled,
  });
}
