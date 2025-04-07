export const onboardingSteps = [
  { id: "preferred-name", label: "Your Name" },
  { id: "workspace-setup", label: "Workspace Setup" },
  { id: "preferences", label: "Preferences" },
  { id: "confirmation", label: "Done!" },
] as const;

export type OnboardingStepId = (typeof onboardingSteps)[number]["id"];
