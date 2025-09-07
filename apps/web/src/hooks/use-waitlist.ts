import { toast } from "@coordinize/ui/components/sonner";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function useWaitlistCount() {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.earlyAccess.getWaitlistCount.queryOptions());
}

export function useJoinWaitlist() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.earlyAccess.joinWaitlist.mutationOptions({
      onMutate: async () => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: trpc.earlyAccess.getWaitlistCount.queryKey(),
        });

        // Snapshot the previous value
        const previousCount = queryClient.getQueryData(
          trpc.earlyAccess.getWaitlistCount.queryKey()
        );

        // Optimistically update to the new value
        queryClient.setQueryData(
          trpc.earlyAccess.getWaitlistCount.queryKey(),
          (old: number | undefined) => (old ?? 0) + 1
        );

        // Return a context object with the snapshotted value
        return { previousCount };
      },
      onError: (_error, _variables, context) => {
        // If the mutation fails, use the context returned from onMutate to roll back
        if (context?.previousCount !== undefined) {
          queryClient.setQueryData(
            trpc.earlyAccess.getWaitlistCount.queryKey(),
            context.previousCount
          );
        }
        toast.error("Something went wrong. Please try again.");
      },
      onSuccess: (data) => {
        toast.success(data.message);
      },
      // Always refetch after error or success
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.earlyAccess.getWaitlistCount.queryKey(),
        });
      },
    })
  );
}
