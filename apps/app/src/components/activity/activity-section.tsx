"use client";

interface ActivitySectionProps {
  readonly children: React.ReactNode;
}

export function ActivitySection({ children }: ActivitySectionProps) {
  return (
    <div className="flex h-full w-full flex-col px-80">
      <div className="mt-16 flex flex-col gap-4">{children}</div>
    </div>
  );
}
