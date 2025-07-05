'use client';

interface ActivitySectionProps {
  readonly children: React.ReactNode;
}

export function ActivitySection({ children }: ActivitySectionProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-lg flex-col px-2">
      <div className="mt-16 flex flex-col gap-6">{children}</div>
    </div>
  );
}
