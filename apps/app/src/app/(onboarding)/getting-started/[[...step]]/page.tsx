"use client";

import { Confirmation } from "@/components/getting-started/confirmation";
import { Preferences } from "@/components/getting-started/preferences";
import { PreferredName } from "@/components/getting-started/preferred-name";
import { WorkspaceSetup } from "@/components/getting-started/workspace-setup";
import { OnboardingStepper } from "@/components/ui/onboarding-stepper";
import { onboardingSteps } from "@/config/onboarding-steps";
import { useParams, useRouter } from "next/navigation";

const stepComponents = {
  "preferred-name": PreferredName,
  "workspace-setup": WorkspaceSetup,
  preferences: Preferences,
  confirmation: Confirmation,
};

const headers = [
  {
    title: "Hi there",
    description: "Let's personalize your experience on Coordinize.",
  },
  {
    title: "Workspace setup",
    description: "Create a workspace and invite your team.",
  },
  { title: "Preferences", description: "Customize your workspace." },
  { title: "Confirmation", description: "You're all set!" },
];

export default function OnboardingPage() {
  const { step } = useParams();
  const router = useRouter();

  const currentStep =
    (step?.[0] as keyof typeof stepComponents) || "preferred-name";
  const CurrentStepComponent = stepComponents[currentStep] ?? PreferredName;

  const stepIndex = onboardingSteps.findIndex((s) => s.id === currentStep);
  const goToNext = () => {
    const next = onboardingSteps[stepIndex + 1]?.id;
    if (next) router.push(`/getting-started/${next}`);
    else router.push("/");
  };
  return (
    <div className="flex w-full flex-col gap-8">
      <OnboardingStepper />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="font-medium text-xl">{headers[stepIndex]?.title}</h1>
          <p className="text-muted-foreground text-sm">
            {headers[stepIndex]?.description}
          </p>
        </div>
        <CurrentStepComponent />
      </div>
    </div>
  );
}
