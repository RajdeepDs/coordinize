import type { ReactNode } from 'react';

type AuthLayoutProps = {
  readonly children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex h-svh w-full items-center justify-center px-4">
      {children}
    </main>
  );
}
