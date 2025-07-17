import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function useToggleFavorite() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.favorite.toggleFavorite.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.favorite.getFavorites.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.post.getPostById.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.space.getSpaceWithPublishedPosts.queryKey(),
        });
      },
    })
  );
}
