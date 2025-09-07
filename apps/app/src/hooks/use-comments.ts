import { toast } from "@coordinize/ui/components/sonner";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function useCommentsQuery(postId: string) {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.comment.getComments.queryOptions({ postId }));
}

export function useCreateComment(postId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.comment.create.mutationOptions({
      onSuccess: () => {
        toast.success("Comment added successfully.");
        queryClient.invalidateQueries({
          queryKey: trpc.comment.getComments.queryKey({ postId }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.timeline.getPostTimeline.queryKey({ postId }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.post.getPostById.queryKey({ id: postId }),
        });
      },
    })
  );
}

export function useUpdateComment(postId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.comment.update.mutationOptions({
      onSuccess: () => {
        toast.success("Comment updated successfully.");
        queryClient.invalidateQueries({
          queryKey: trpc.comment.getComments.queryKey({ postId }),
        });
      },
    })
  );
}

export function useDeleteComment(postId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.comment.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Comment deleted successfully.");
        queryClient.invalidateQueries({
          queryKey: trpc.comment.getComments.queryKey({ postId }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.timeline.getPostTimeline.queryKey({ postId }),
        });
      },
    })
  );
}
