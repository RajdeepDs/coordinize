interface OnboardingLayoutProps {
  readonly children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <main className="flex h-svh w-full flex-col items-center justify-center">
      {children}
    </main>
  );
}
