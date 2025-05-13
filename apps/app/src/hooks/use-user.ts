"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useUserQuery() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.user.me.queryOptions());
}
