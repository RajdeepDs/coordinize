"use client";

import type { User } from "@coordinize/database/db";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function useUserQuery() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.user.me.queryOptions());
}

export function useStatusEmoji() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.user.updateStatusEmoji.mutationOptions({
      onMutate: async (newData) => {
        // Cancel any outgoing refetch
        await queryClient.cancelQueries({ queryKey: trpc.user.me.queryKey() });

        // Fetch the previous value
        const previousData = queryClient.getQueryData(trpc.user.me.queryKey());

        // Optimistically update to the new value
        queryClient.setQueryData(
          trpc.user.me.queryKey(),
          (old: User | null | undefined) =>
            old && {
              ...old,
              statusEmoji: newData.statusEmoji,
            }
        );

        return { previousData };
      },
      onError: (_, __, context) => {
        // Rollback on error
        queryClient.setQueryData(
          trpc.user.me.queryKey(),
          context?.previousData
        );
      },
      onSettled: () => {
        // Refetch after error or success
        queryClient.invalidateQueries({
          queryKey: trpc.user.me.queryKey(),
        });
      },
    })
  );
}
