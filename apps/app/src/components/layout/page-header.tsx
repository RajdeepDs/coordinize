'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@coordinize/ui/components/breadcrumb';
import { Separator } from '@coordinize/ui/components/separator';
import { SidebarTrigger, useSidebar } from '@coordinize/ui/components/sidebar';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface BreadcrumbProps {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface PageHeaderProps {
  readonly leftContent?: ReactNode;
  readonly rightContent?: ReactNode;
  breadcrumb: BreadcrumbProps[];
  showRightSidebarTrigger?: boolean;
}

export function PageHeader({
  leftContent,
  rightContent,
  breadcrumb,
  showRightSidebarTrigger,
}: PageHeaderProps) {
  const { isMobile, leftState } = useSidebar();

  return (
    <header className="flex items-center justify-between px-2 py-1">
      <div className="flex h-full items-center gap-3">
        {(isMobile || leftState === 'collapsed') && (
          <div className="flex items-center gap-1.5">
            <SidebarTrigger className="size-7 rounded-sm text-muted-foreground" />
            <Separator className="min-h-4" orientation="vertical" />
          </div>
        )}

        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList className="sm:gap-1.5">
            {breadcrumb.map((item, index) => (
              <div
                className="flex items-center gap-1.5"
                key={`${item.label}-${index}`}
              >
                <BreadcrumbItem>
                  {item.href ? (
                    <Link
                      className="flex items-center gap-1.5 text-foreground"
                      href={item.href}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ) : (
                    <BreadcrumbPage className="flex items-center gap-1.5">
                      {item.icon}
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumb.length - 1 && (
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {leftContent}
      </div>

      <div className="flex items-center gap-2">
        {rightContent}

        {showRightSidebarTrigger && (
          <SidebarTrigger
            className="size-7 rounded-sm text-muted-foreground focus-visible:ring-0"
            side="right"
          />
        )}
      </div>
    </header>
  );
}
