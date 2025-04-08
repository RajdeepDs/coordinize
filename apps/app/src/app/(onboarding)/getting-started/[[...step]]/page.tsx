"use client";

import { Preferences } from "@/components/getting-started/preferences";
import { Welcome } from "@/components/getting-started/welcome";
import { WorkspaceSetup } from "@/components/getting-started/workspace-setup";
import { OnboardingStepper } from "@/components/ui/onboarding-stepper";
import { onboardingSteps } from "@/config/onboarding-steps";
import { useParams, useRouter } from "next/navigation";

const stepComponents = {
  welcome: Welcome,
  "workspace-setup": WorkspaceSetup,
  preferences: Preferences,
};

const headers = [
  {
    title: "Welcome to Coordinize!",
    description: "Create your personalized workspace.",
  },
  {
    title: "Build Your Workspace",
    description: "Set up your collaborative workspace.",
  },
  {
    title: "Make It Yours",
    description: "Customize your workflow settings.",
  },
];

export default function OnboardingPage() {
  const { step } = useParams();
  const router = useRouter();

  const currentStep = (step?.[0] as keyof typeof stepComponents) || "welcome";
  const CurrentStepComponent = stepComponents[currentStep] ?? Welcome;

  const stepIndex = onboardingSteps.findIndex((s) => s.id === currentStep);

  const goToNext = () => {
    const next = onboardingSteps[stepIndex + 1]?.id;
    if (next) router.push(`/getting-started/${next}`);
    else router.push("/");
  };
  return (
    <div className="flex w-full flex-col gap-10">
      <OnboardingStepper />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="font-medium text-base">{headers[stepIndex]?.title}</h1>
          <p className="text-muted-foreground text-sm">
            {headers[stepIndex]?.description}
          </p>
        </div>
        <CurrentStepComponent />
      </div>
    </div>
  );
}
