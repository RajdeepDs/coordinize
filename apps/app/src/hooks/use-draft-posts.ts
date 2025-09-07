"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function useDraftPostsQuery() {
  const trpc = useTRPC();
  return useQuery(trpc.post.getDrafts.queryOptions());
}
