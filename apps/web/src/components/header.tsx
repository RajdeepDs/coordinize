import { env } from "@/env";
import Link from "next/link";

import { WordLogo } from "@/components/word-logo";
import { Button } from "@coordinize/ui/components/button";

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 border-border border-b bg-transparent backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <Link href={"/"}>
          <WordLogo />
        </Link>
        <Button asChild size={"sm"}>
          <Link href={`${APP_URL}/private-beta`}>Sign in</Link>
        </Button>
      </div>
    </header>
  );
}
