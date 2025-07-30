import { OnboardingClient } from '@/components/onboarding/onboarding-client';

export const steps = {
  welcome: 'Welcome to Coordinize',
  'choose-style': 'Choose Your Theme',
  invite: 'Invite Your Team',
  ready: `You're All Set`,
} as const;

export type StepKey = keyof typeof steps;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ step: keyof typeof steps }>;
}) {
  const { step } = await params;
  return {
    title: steps[step] || 'Onboarding',
    description: `Onboarding step: ${steps[step] || 'Welcome to Coordinize'}`,
  };
}

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ step: StepKey }>;
}) {
  const { step } = await params;

  const stepKey = step?.[0] as StepKey | undefined;
  const currentStep = stepKey ?? 'welcome';

  return (
    <div>
      <OnboardingClient step={currentStep} />
    </div>
  );
}
