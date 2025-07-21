import { Button } from '@coordinize/ui/components/button';
import { InviteHeader } from '@/components/auth/invite-header';
import { BoxLogo } from '@/components/ui/box-logo';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

export default function InvitePage() {
  prefetch(trpc.user.me.queryOptions());

  return (
    <HydrateClient>
      <main className="flex h-svh w-full flex-col items-center justify-center">
        <InviteHeader />
        <div className="flex flex-col items-center gap-8 text-center">
          <BoxLogo className="size-14 rounded-sm" />
          <div className="space-y-4">
            <h1 className="font-bold text-3xl">Join Acme Inc.</h1>
            <p className="mt-2 text-ui-gray-900">
              You&apos;ve been invited to work async — without chaos. <br />
              Set up your profile and join the team to start collaborating in
              flow.
            </p>
          </div>
          <Button className="min-w-xs" size={'lg'} variant={'default'}>
            Continue
          </Button>
        </div>
      </main>
    </HydrateClient>
  );
}
