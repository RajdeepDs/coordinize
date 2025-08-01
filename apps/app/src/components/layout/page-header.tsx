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
    <header className="flex min-h-8 items-center justify-between px-2">
      <div className="flex h-full min-w-0 flex-1 items-center gap-3">
        {(isMobile || leftState === 'collapsed') && (
          <div className="flex shrink-0 items-center gap-1.5">
            <SidebarTrigger className="size-7 rounded-sm text-muted-foreground" />
            <Separator className="min-h-4" orientation="vertical" />
          </div>
        )}

        {/* Breadcrumbs */}
        <Breadcrumb className="min-w-0 shrink">
          <BreadcrumbList className="sm:gap-1.5">
            {breadcrumb.map((item, index) => (
              <div
                className="flex min-w-0 items-center gap-1.5"
                key={`${item.label}-${index}`}
              >
                <BreadcrumbItem className="min-w-0">
                  {item.href ? (
                    <Link
                      className="flex min-w-0 items-center gap-1.5 text-foreground"
                      href={item.href}
                    >
                      {item.icon && <span>{item.icon}</span>}
                      <span className="max-w-[10ch] overflow-hidden truncate text-ellipsis whitespace-nowrap sm:max-w-[32ch]">
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <BreadcrumbPage className="flex min-w-0 items-center gap-1.5">
                      {item.icon && <span>{item.icon}</span>}
                      <span className="max-w-[10ch] overflow-hidden truncate text-ellipsis whitespace-nowrap sm:max-w-[32ch]">
                        {item.label}
                      </span>
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
