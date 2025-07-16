import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function usePublishedPostsQuery() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.post.getAllPublished.queryOptions());
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
      },
    })
  );
}
