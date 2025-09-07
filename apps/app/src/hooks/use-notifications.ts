import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function useInboxQuery(filter: "all" | "unread" | "archived" = "all") {
  const trpc = useTRPC();

  return useQuery(
    trpc.notification.getInbox.queryOptions({
      filter,
    })
  );
}

export function useNotificationCounts() {
  const trpc = useTRPC();

  return useQuery(trpc.notification.getCounts.queryOptions());
}

export function useMarkAsRead() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.notification.markAsRead.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.notification.getInbox.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.notification.getCounts.queryKey(),
        });
      },
    })
  );
}

export function useMarkAllAsRead() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.notification.markAllAsRead.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.notification.getInbox.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.notification.getCounts.queryKey(),
        });
      },
    })
  );
}

export function useArchiveNotifications() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.notification.archive.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.notification.getInbox.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.notification.getCounts.queryKey(),
        });
      },
    })
  );
}

export function useUnarchiveNotifications() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.notification.unarchive.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.notification.getInbox.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.notification.getCounts.queryKey(),
        });
      },
    })
  );
}

export function useDeleteNotifications() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.notification.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.notification.getInbox.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.notification.getCounts.queryKey(),
        });
      },
    })
  );
}
