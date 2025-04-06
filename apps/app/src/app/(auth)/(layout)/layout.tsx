import type { ReactNode } from "react";

import { Header } from "@/components/header";
import RollingCaptions from "@/components/rolling-captions";

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const captions: string[] = [
  "Effortless collaboration, on your time.",
  "Less noise, more clarity.",
  "Collaboration without the chaos.",
  "Stay in sync, asynchronously.",
  "Global teams, one streamlined space.",
] as const;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex flex-1 lg:grid lg:grid-cols-3">
        <div className="w-full overflow-auto lg:col-span-2">{children}</div>
        <RollingCaptions captions={captions} />
      </main>
    </div>
  );
}
