'use client';

import { Button } from '@coordinize/ui/components/button';
import { Logo } from '@/components/ui/logo';

interface WelcomeProps {
  nextStep: () => void;
}

export function Welcome({ nextStep }: WelcomeProps) {
  return (
    <div className="flex w-full flex-col items-center space-y-8 text-center">
      <Logo />
      <div className="flex flex-col items-center space-y-6">
        <h1 className="font-semibold text-3xl sm:text-[2.5rem]">
          Welcome to Coordinize
        </h1>
        <p className="text-sm text-ui-gray-900">
          A modern async-first platform built for global teams. <br />{' '}
          Communicate clearly, collaborate effortlessly.
        </p>
      </div>
      <Button className="h-11 w-3xs" onClick={nextStep} size={'lg'}>
        Continue
      </Button>
    </div>
  );
}
