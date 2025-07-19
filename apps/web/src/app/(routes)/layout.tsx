import type { ReactNode } from 'react';

import { Header } from '@/components/layout/header';

type HomeLayoutProps = {
  readonly children: ReactNode;
};

// Required for tRPC prefetching
export const dynamic = 'force-dynamic';

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
