'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { ComponentProps } from 'react';

interface PreserveCallbackLinkProps extends ComponentProps<typeof Link> {
  href: string;
  children: React.ReactNode;
}

/**
 * Link component that preserves callbackUrl when navigating between auth pages
 */
export function PreserveCallbackLink({
  href,
  children,
  ...props
}: PreserveCallbackLinkProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const finalHref = callbackUrl
    ? `${href}?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : href;

  return (
    <Link href={finalHref} {...props}>
      {children}
    </Link>
  );
}
