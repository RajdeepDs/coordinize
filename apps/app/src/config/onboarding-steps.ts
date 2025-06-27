export const onboardingSteps = [
  { id: 'welcome', label: 'Your Name' },
  { id: 'workspace-setup', label: 'Workspace Setup' },
  { id: 'preferences', label: 'Preferences' },
] as const;

export type OnboardingStepId = (typeof onboardingSteps)[number]['id'];
