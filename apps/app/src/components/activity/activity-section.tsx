"use client";

interface ActivitySectionProps {
  readonly children: React.ReactNode;
}

export function ActivitySection({ children }: ActivitySectionProps) {
  return <div className="h-full w-full px-80">{children}</div>;
}
