"use client";

import { ScrollableContainer } from "@/components/layout/scrollable-container";

type ActivitySectionProps = {
  readonly children: React.ReactNode;
};

export function ActivitySection({ children }: ActivitySectionProps) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <ScrollableContainer>
        <div className="mx-auto mt-16 mb-8 w-full max-w-screen-md space-y-6 px-2">
          {children}
        </div>
      </ScrollableContainer>
    </div>
  );
}
