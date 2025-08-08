'use client';

import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import Link from 'next/link';
import { env } from '@/env';
import { Logo } from '../logo';
import { ThemeToggle } from '../theme-toggle';

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

const Links = [
  {
    href: '/product',
    label: 'Product',
  },
  {
    href: '/resources',
    label: 'Resources',
  },
  {
    href: '/changelog',
    label: 'Changelog',
  },
  {
    href: '/community',
    label: 'Community',
  },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background-200 backdrop-blur-lg">
      <div className="flex h-(--header-height) items-center justify-between px-4">
        <Link href={'/'}>
          <Logo />
        </Link>

        <div className="-translate-x-1/2 absolute left-1/2 hidden gap-2 sm:flex">
          {Links.map((link) => (
            <Button
              asChild
              className="text-muted-foreground"
              key={link.href}
              size="sm"
              variant="ghost"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href={`${APP_URL}/login`}>
            <Button size="sm" variant="ghost">
              Log in
            </Button>
          </Link>
          <Link href={`${APP_URL}/sign-up`}>
            <Button size="sm" variant="default">
              Sign up
            </Button>
          </Link>
        </div>

        <div className="hidden items-center gap-2">
          <Button
            asChild
            className="size-8 text-foreground"
            size="icon"
            variant="ghost"
          >
            <Link
              aria-label="Visit our GitHub repository"
              href={'https://github.com/RajdeepDs/coordinize'}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icons.github fill="currentColor" />
            </Link>
          </Button>
          <Button
            asChild
            className="size-8 text-foreground"
            size="icon"
            variant="ghost"
          >
            <Link
              aria-label="Follow us on X (Twitter)"
              href={'https://x.com/Rajdeep__ds'}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icons.twitter fill="currentColor" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
