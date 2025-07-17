import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function useFavoritesQuery() {
  const trpc = useTRPC();
  return useQuery(trpc.favorite.getFavorites.queryOptions());
}
