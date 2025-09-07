import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function useCurrentWorkspaceQuery() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workspace.current.queryOptions());
}
