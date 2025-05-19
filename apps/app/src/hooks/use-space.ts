import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSpacesQuery() {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.space.getAll.queryOptions());
}
