import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function useCommentReactions(commentId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: reactions = [], isLoading } = useQuery(
    trpc.commentReaction.getByCommentId.queryOptions({ commentId })
  );

  const toggleReaction = useMutation(
    trpc.commentReaction.toggle.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.commentReaction.getByCommentId.queryKey({ commentId }),
        });
      },
    })
  );

  return {
    reactions,
    isLoading,
    toggleReaction: (emoji: string) =>
      toggleReaction.mutate({ commentId, emoji }),
    isToggling: toggleReaction.isPending,
  };
}
