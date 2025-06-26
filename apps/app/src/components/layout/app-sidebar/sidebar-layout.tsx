'use client';

import { SidebarInset, useSidebar } from '@coordinize/ui/components/sidebar';
import { cn } from '@coordinize/ui/lib/utils';

interface SidebarLayoutProps {
  readonly children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const { isMobile, state } = useSidebar();
  return (
    <div
      className={cn('flex w-full flex-col bg-sidebar py-2 pr-2', {
        'pl-2': isMobile || state === 'collapsed',
      })}
    >
      <SidebarInset className="bg-transparent">{children}</SidebarInset>
    </div>
  );
}
