"use client";

import { onboardingSteps } from "@/config/onboarding-steps";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from "@coordinize/ui/components/stepper";
import { useParams, useRouter } from "next/navigation";

export function OnboardingStepper() {
  const router = useRouter();
  const { step } = useParams();
  const currentStepId = (step?.[0] as string) || "preferred-name";

  const currentStepIndex =
    onboardingSteps.findIndex((s) => s.id === currentStepId) + 1;

  return (
    <div className="mx-auto flex w-full flex-col gap-1 text-center">
      <p className="select-none text-start text-muted-foreground text-sm">
        Step {currentStepIndex} of {onboardingSteps.length}
      </p>
      <Stepper value={currentStepIndex} defaultValue={1} className="gap-2">
        {onboardingSteps.map((step, index) => (
          <StepperItem key={step.id} step={index + 1} className="flex-1">
            <StepperTrigger
              onClick={() => router.push(`/getting-started/${step.id}`)}
              className="w-full flex-col items-start gap-2 rounded"
            >
              <StepperIndicator asChild className="h-1 w-full bg-border">
                <span className="sr-only">{step.id}</span>
              </StepperIndicator>
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}
