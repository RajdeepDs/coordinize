import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ScrollableContainer } from '@/components/scrollable-container';

type HomeLayoutProps = {
  readonly children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <ScrollableContainer>
        <Header />
        {children}
        <Footer />
      </ScrollableContainer>
    </>
  );
}
