'use client';

import { motion as m } from 'motion/react';
import { useRouter } from 'next/navigation';
import type { StepKey } from '@/app/(onboarding)/onboarding/[[...step]]/page';
import { ChooseStyle } from './choose-style';
import { Invite } from './invite';
import { Ready } from './ready';
import { Welcome } from './welcome';

interface OnboardingClientProps {
  step: StepKey;
}

const stepComponents = {
  welcome: Welcome,
  'choose-style': ChooseStyle,
  invite: Invite,
  ready: Ready,
} as const;

export function OnboardingClient({ step }: OnboardingClientProps) {
  const router = useRouter();

  const CurrentStepComponent = stepComponents[step] || Welcome;

  return (
    <m.div
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <CurrentStepComponent />
    </m.div>
  );
}
