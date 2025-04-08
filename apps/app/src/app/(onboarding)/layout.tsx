import { OnboardingHeader } from "@/components/getting-started/onboarding-header";
import type { Metadata } from "next";

interface OnboardingLayoutProps {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Getting started | Coordinize",
  description: "Getting started with Coordinize.",
};

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <>
      <OnboardingHeader />
      <div className="absolute inset-x-0 top-[20%] mx-auto flex max-w-[20rem] flex-col items-center gap-5">
        {children}
      </div>
    </>
  );
}
