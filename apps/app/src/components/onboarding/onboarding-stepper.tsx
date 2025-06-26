'use client';

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from '@coordinize/ui/components/stepper';
import { useParams, useRouter } from 'next/navigation';
import { onboardingSteps } from '@/config/onboarding-steps';

export function OnboardingStepper() {
  const router = useRouter();
  const { step } = useParams();
  const currentStepId = (step?.[0] as string) || 'welcome';

  const currentStepIndex =
    onboardingSteps.findIndex((s) => s.id === currentStepId) + 1;

  return (
    <div className="mx-auto flex w-full flex-col gap-1 text-center">
      <p className="select-none text-start text-muted-foreground text-sm">
        Step {currentStepIndex} of {onboardingSteps.length}
      </p>
      <Stepper className="gap-2" defaultValue={1} value={currentStepIndex}>
        {onboardingSteps.map((onboardingStep, idx) => (
          <StepperItem
            className="flex-1"
            key={onboardingStep.id}
            step={idx + 1}
          >
            <StepperTrigger
              className="w-full flex-col items-start gap-2 rounded"
              onClick={() =>
                router.push(`/getting-started/${onboardingStep.id}`)
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  router.push(`/getting-started/${onboardingStep.id}`);
                }
              }}
            >
              <StepperIndicator asChild className="h-1 w-full bg-border">
                <span className="sr-only">{onboardingStep.id}</span>
              </StepperIndicator>
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}
