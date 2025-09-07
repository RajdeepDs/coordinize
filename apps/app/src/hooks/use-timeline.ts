"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function usePostTimelineQuery(postId: string) {
  const trpc = useTRPC();
  return useQuery(trpc.timeline.getPostTimeline.queryOptions({ postId }));
}

export function useCreateTimelineEvent() {
  const trpc = useTRPC();
  return useMutation(trpc.timeline.createEvent.mutationOptions());
}
