import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function useToggleFavorite() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.favorite.toggleFavorite.mutationOptions({
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          queryKey: trpc.favorite.getFavorites.queryKey(),
        });

        // Only invalidate specific queries based on the toggle type
        if (variables.type === "post") {
          queryClient.invalidateQueries({
            queryKey: trpc.post.getPostById.queryKey({ id: variables.id }),
          });
        } else if (variables.type === "space") {
          queryClient.invalidateQueries({
            queryKey: trpc.space.getSpaceWithPublishedPosts.queryKey(),
          });
        }
      },
    })
  );
}
