'use client';

import type { OnboardingStep } from '@coordinize/database/db';
import { Button } from '@coordinize/ui/components/button';
import { useRouter } from 'next/navigation';
import { BoxLogo } from '@/components/ui/box-logo';
import { useAcceptInvite, useInviteTokenInfo } from '@/hooks/use-invites';
import { useUserQuery } from '@/hooks/use-user';

const onboardingRouteMap: Record<OnboardingStep, string> = {
  WELCOME: 'welcome',
  WORKSPACE_SETUP: 'workspace-setup',
  PREFERENCES: 'preferences',
};

export function AcceptInvite({ token }: { token: string }) {
  const router = useRouter();
  const { data: inviteToken } = useInviteTokenInfo(token);
  const { data: user } = useUserQuery();
  const { mutate: acceptInvite } = useAcceptInvite();

  function handleContinue() {
    acceptInvite({ token });
    if (user?.onboarded) {
      router.push(`/${user.defaultWorkspace}`);
    } else {
      const currentStepPath = `/getting-started/${onboardingRouteMap[user?.onboardingStep as OnboardingStep]}`;
      router.push(currentStepPath);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 px-4 text-center">
      <BoxLogo className="size-14 rounded-sm" />
      <div className="space-y-4">
        <h1 className="font-bold text-3xl">
          Join {inviteToken?.workspace.name}
        </h1>
        <p className="mt-2 text-sm text-ui-gray-900 sm:text-base">
          You&apos;ve been invited to work async — without chaos. <br />
          Set up your profile and join the team to start collaborating in flow.
        </p>
      </div>
      <Button
        className="min-w-xs"
        onClick={handleContinue}
        size={'lg'}
        variant={'default'}
      >
        Continue
      </Button>
    </div>
  );
}
