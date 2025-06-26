import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function useSpacesQuery() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.space.getAll.queryOptions());
}
