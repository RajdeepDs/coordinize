"use client";

interface ActivitySectionProps {
  readonly children: React.ReactNode;
}

export function ActivitySection({ children }: ActivitySectionProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 px-80">{children}</div>
  );
}
