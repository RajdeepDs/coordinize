"use client";

import { Button } from "@coordinize/ui/components/button";
import Link from "next/link";
import { env } from "@/env";
import { Logo } from "../logo";

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

const Links = [
  {
    href: "/product",
    label: "Product",
  },
  {
    href: "/resources",
    label: "Resources",
  },
  {
    href: "/changelog",
    label: "Changelog",
  },
  {
    href: "/community",
    label: "Community",
  },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background-200 backdrop-blur-lg">
      <div className="flex h-(--header-height) items-center justify-between px-4">
        <Link href={"/"}>
          <Logo />
        </Link>

        <div className="-translate-x-1/2 absolute left-1/2 hidden gap-2">
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
          <Button asChild size="sm" variant="ghost">
            <Link href={`${APP_URL}/login`}>Log in</Link>
          </Button>
          <Button asChild size="sm" variant="default">
            <Link href={`${APP_URL}/sign-up`}>Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
