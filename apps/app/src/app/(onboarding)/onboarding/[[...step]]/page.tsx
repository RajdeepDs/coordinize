import type { Metadata } from 'next';
import { OnboardingClient } from '@/components/onboarding/onboarding-client';
import type { OnboardingStepId } from '@/config/onboarding-steps';

type StepKey = OnboardingStepId;

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Complete your onboarding steps to get started with Coordinize.',
};

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ step?: StepKey }>;
}) {
  const { step } = await params;

  const currentStep: StepKey = step ?? 'welcome';

  return (
    <div>
      <OnboardingClient step={currentStep} />
    </div>
  );
}
