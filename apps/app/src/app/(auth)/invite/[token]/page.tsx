import { AcceptInvite } from '@/components/auth/accept-invite';
import { InviteHeader } from '@/components/auth/invite-header';
import { batchPrefetch, HydrateClient, trpc } from '@/trpc/server';

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  batchPrefetch([
    trpc.user.me.queryOptions(),
    trpc.invite.getTokenInfo.queryOptions({ token }),
  ]);

  return (
    <HydrateClient>
      <main className="flex h-svh w-full flex-col items-center justify-center">
        <InviteHeader />
        <AcceptInvite token={token} />
      </main>
    </HydrateClient>
  );
}
