"use client";

import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";

import { OnboardingStepper } from "@/components/onboarding/onboarding-stepper";
import { Preferences } from "@/components/onboarding/preferences";
import { Welcome } from "@/components/onboarding/welcome";
import { WorkspaceSetup } from "@/components/onboarding/workspace-setup";
import { onboardingSteps } from "@/config/onboarding-steps";

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
    <motion.div
      className="flex w-full flex-col gap-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <OnboardingStepper />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="font-medium text-base">{headers[stepIndex]?.title}</h1>
          <p className="text-muted-foreground text-sm">
            {headers[stepIndex]?.description}
          </p>
        </div>
        <CurrentStepComponent nextStep={goToNext} />
      </div>
    </motion.div>
  );
}
