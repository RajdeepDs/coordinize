import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function useFavoritesQuery() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.favorite.getFavorites.queryOptions());
}
