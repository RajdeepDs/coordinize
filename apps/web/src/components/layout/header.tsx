"use client";

import { env } from "@/env";
import Link from "next/link";

import { WordLogo } from "@/components/word-logo";
import { Button } from "@coordinize/ui/components/button";
import { Separator } from "@coordinize/ui/components/separator";

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur-lg">
      <div className="flex h-(--header-height) items-center justify-between px-4">
        <Link href={"/"}>
          <WordLogo />
        </Link>

        <div className="hidden gap-2">
          {Links.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href={"/docs"} className="hidden">
            <Button variant="ghost" size="sm">
              Docs
            </Button>
          </Link>
          <Separator orientation="vertical" className="hidden min-h-5" />
          <Link href={`${APP_URL}/private-beta`}>
            <Button variant="default" size="sm">
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
