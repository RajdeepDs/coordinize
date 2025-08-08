import type { ReactNode } from 'react';

import { Header } from '@/components/layout/header';
import { ScrollableContainer } from '@/components/scrollable-container';

type HomeLayoutProps = {
  readonly children: ReactNode;
};

// Required for tRPC prefetching
export const dynamic = 'force-dynamic';

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      <ScrollableContainer>{children}</ScrollableContainer>
    </>
  );
}
