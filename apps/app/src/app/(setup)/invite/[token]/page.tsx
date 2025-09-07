import type { Metadata } from "next";
import { AcceptInvite } from "@/components/setup/accept-invite";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export const metadata: Metadata = {
  title: "Accept Invite",
};

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  prefetch(trpc.invite.getTokenInfo.queryOptions({ token }));

  return (
    <HydrateClient>
      <AcceptInvite token={token} />
    </HydrateClient>
  );
}
