import type { Metadata } from 'next';
import { Suspense } from 'react';
import { OnboardingHeader } from '@/components/onboarding/onboarding-header';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

interface OnboardingLayoutProps {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Getting started | Coordinize',
  description: 'Getting started with Coordinize.',
};

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  prefetch(trpc.user.me.queryOptions());

  return (
    <HydrateClient>
      <Suspense fallback={<>Loading...</>}>
        <OnboardingHeader />
        <div className="absolute inset-x-0 top-[20%] mx-auto flex max-w-[20rem] flex-col items-center gap-5">
          {children}
        </div>
      </Suspense>
    </HydrateClient>
  );
}
