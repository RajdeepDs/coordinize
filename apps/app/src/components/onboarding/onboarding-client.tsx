'use client';

import { useMutation } from '@tanstack/react-query';
import { motion as m } from 'motion/react';
import { useRouter } from 'next/navigation';
import { ChooseStyle } from '@/components/onboarding/choose-style';
import { Invite } from '@/components/onboarding/invite';
import { Ready } from '@/components/onboarding/ready';
import { Welcome } from '@/components/onboarding/welcome';
import {
  type OnboardingStepId,
  onboardingSteps,
} from '@/config/onboarding-steps';
import { useTRPC } from '@/trpc/client';

type StepKey = OnboardingStepId;

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
  const trpc = useTRPC();
  const router = useRouter();

  const { mutate: updateOnboarding } = useMutation(
    trpc.user.updateOnboarding.mutationOptions()
  );

  const currentStep = (step?.[0] as keyof typeof stepComponents) || 'welcome';
  const CurrentStepComponent = stepComponents[currentStep] || Welcome;

  const stepIndex = onboardingSteps.findIndex((s) => s.id === currentStep);

  const goToNext = () => {
    const next = onboardingSteps[stepIndex + 1]?.id;
    if (next) {
      router.push(`/onboarding/${next}`);
    } else {
      updateOnboarding();
      router.push('/');
    }
  };

  return (
    <m.div
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <CurrentStepComponent nextStep={goToNext} />
    </m.div>
  );
}
