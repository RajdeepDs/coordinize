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
    <div className="flex w-full flex-col gap-4">
      <OnboardingStepper />
      <CurrentStepComponent />
    </div>
  );
}
