import { InviteHeader } from '@/components/auth/invite-header';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  prefetch(trpc.user.me.queryOptions());

  return (
    <HydrateClient>
      <main className="flex h-svh w-full flex-col items-center justify-center">
        <InviteHeader />
        {children}
      </main>
    </HydrateClient>
  );
}
