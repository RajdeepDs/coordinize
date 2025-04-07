import type { Metadata } from "next";

import { Header } from "@/components/header";
import { Button } from "@coordinize/ui/components/button";

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
      <Header>
        <Button size={"sm"}>Log out</Button>
      </Header>
      <div className="absolute inset-x-0 top-[20%] mx-auto flex max-w-[20rem] flex-col items-center gap-5">
        {children}
      </div>
    </>
  );
}
