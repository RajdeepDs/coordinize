export const onboardingSteps = [
  { id: 'welcome', label: 'Welcome to Coordinize' },
  { id: 'choose-style', label: 'Choose Your Theme' },
  { id: 'invite', label: 'Invite Your Team' },
  { id: 'ready', label: `You're All Set` },
] as const;

export type OnboardingStepId = (typeof onboardingSteps)[number]['id'];
