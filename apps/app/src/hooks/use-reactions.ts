import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function useReactions(postId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: reactions = [], isLoading } = useQuery(
    trpc.reaction.getByPostId.queryOptions({ postId })
  );

  const toggleReaction = useMutation(
    trpc.reaction.toggle.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.reaction.getByPostId.queryKey({ postId }),
        });
      },
    })
  );

  return {
    reactions,
    isLoading,
    toggleReaction: (emoji: string) => toggleReaction.mutate({ postId, emoji }),
    isToggling: toggleReaction.isPending,
  };
}
