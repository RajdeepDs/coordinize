'use client';

import { Button } from '@coordinize/ui/components/button';
import { AnimatePresence, motion as m } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { useAcceptInvite, useInviteTokenInfo } from '@/hooks/use-invites';
import { useUserQuery } from '@/hooks/use-user';

export function AcceptInvite({ token }: { token: string }) {
  const router = useRouter();
  const { data: inviteToken } = useInviteTokenInfo(token);
  const { data: user } = useUserQuery();
  const { mutate: acceptInvite } = useAcceptInvite();
  const workspaceName = inviteToken?.workspace.name || 'the workspace';

  function handleContinue() {
    acceptInvite({ token });
    if (user?.onboarded) {
      router.push(`/${user.defaultWorkspace}`);
    } else {
      const currentStepPath = '/onboarding/welcome';
      router.push(currentStepPath);
    }
  }

  return (
    <m.div
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      className="w-full max-w-xs text-center"
      initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <div className="flex flex-col items-center space-y-9 text-center">
        <Logo />
        <AnimatePresence mode="wait">
          <m.div
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className="w-full"
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="font-medium text-lg">Join {workspaceName}</h1>
                <p className="text-sm text-ui-gray-900">
                  You&apos;ve been invited to work async. <br />
                  Set up your profile and join the team.
                </p>
              </div>
              <Button
                className="h-11 w-full"
                onClick={handleContinue}
                size={'lg'}
              >
                Continue
              </Button>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </m.div>
  );
}
