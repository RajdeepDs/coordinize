'use client';

import { useSidebar } from '@coordinize/ui/components/sidebar';
import { cn } from '@coordinize/ui/lib/utils';

interface SidebarLayoutProps {
  readonly children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const { isMobile, leftState } = useSidebar();
  return (
    <div
      className={cn(
        'flex h-screen w-full flex-col overflow-hidden bg-sidebar py-2 pr-2',
        {
          'pl-2': isMobile || leftState === 'collapsed',
        }
      )}
    >
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
