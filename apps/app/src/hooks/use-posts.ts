import { toast } from "@coordinize/ui/components/sonner";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";

export function usePublishedPostsQuery() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.post.getAllPublished.queryOptions());
}

export function usePostByIdQuery(postId: string) {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.post.getPostById.queryOptions({ id: postId }));
}

export function useUpdatePost(postId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.post.update.mutationOptions({
      onMutate: async (newData) => {
        await queryClient.cancelQueries({
          queryKey: trpc.post.getPostById.queryKey({ id: postId }),
        });

        const previousPost = queryClient.getQueryData(
          trpc.post.getPostById.queryKey({ id: postId })
        );

        queryClient.setQueryData(
          trpc.post.getPostById.queryKey({ id: postId }),
          (old) => {
            if (!old) {
              return old;
            }
            return {
              ...old,
              title: newData.title ?? old.title,
              content: newData.content ?? old.content,
            };
          }
        );

        return { previousPost };
      },
      onError: (_error, _newData, context) => {
        if (context?.previousPost) {
          queryClient.setQueryData(
            trpc.post.getPostById.queryKey({ id: postId }),
            context.previousPost
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.post.getPostById.queryKey({ id: postId }),
        });

        queryClient.invalidateQueries({
          queryKey: trpc.post.getAllPublished.queryKey(),
        });

        queryClient.invalidateQueries({
          queryKey: trpc.space.getSpaceWithPublishedPosts.queryKey(),
        });

        queryClient.invalidateQueries({
          queryKey: trpc.timeline.getPostTimeline.queryKey({ postId }),
        });
      },
    })
  );
}

export function useDeletePost() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    trpc.post.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Post deleted successfully.");
        queryClient.invalidateQueries({
          queryKey: trpc.post.getAllPublished.queryKey(),
        });
      },
      onSettled: () => {
        router.back();
      },
    })
  );
}

export function useResolvePost(postId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.post.resolve.mutationOptions({
      onSuccess: () => {
        toast.success("Post resolved successfully.");
        queryClient.invalidateQueries({
          queryKey: trpc.post.getAllPublished.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.post.getPostById.queryKey({
            id: postId,
          }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.space.getSpaceWithPublishedPosts.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.timeline.getPostTimeline.queryKey({ postId }),
        });
      },
    })
  );
}

export function useUnresolvePost(postId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.post.unresolve.mutationOptions({
      onSuccess: () => {
        toast.success("Post reopened successfully.");
        queryClient.invalidateQueries({
          queryKey: trpc.post.getAllPublished.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.post.getPostById.queryKey({
            id: postId,
          }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.space.getSpaceWithPublishedPosts.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.timeline.getPostTimeline.queryKey({ postId }),
        });
      },
    })
  );
}

export function useMovePostToSpace(postId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.post.movePostToSpace.mutationOptions({
      onSuccess: () => {
        toast.success("Post moved to space successfully.");
        queryClient.invalidateQueries({
          queryKey: trpc.post.getAllPublished.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.post.getPostById.queryKey({
            id: postId,
          }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.space.getSpaceWithPublishedPosts.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.timeline.getPostTimeline.queryKey({ postId }),
        });
      },
    })
  );
}

export function usePinPostToSpace(postId: string) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.post.pinPostToSpace.mutationOptions({
      onSuccess: (_, variables) => {
        const message = variables.pinned
          ? "Post pinned to space successfully."
          : "Post unpinned from space successfully.";
        toast.success(message);
        queryClient.invalidateQueries({
          queryKey: trpc.post.getPostById.queryKey({ id: postId }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.space.getSpaceWithPublishedPosts.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.timeline.getPostTimeline.queryKey({ postId }),
        });
      },
    })
  );
}
