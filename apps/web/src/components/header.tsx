import { env } from "@/env";
import Link from "next/link";

import { WordLogo } from "@/components/word-logo";
import { Button } from "@coordinize/ui/components/button";

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 border-b border-border">
      <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href={"/"}>
          <WordLogo />
        </Link>
        <Button asChild size={"sm"}>
          <Link href={`${APP_URL}/sign-in`}>Sign in</Link>
        </Button>
      </div>
    </header>
  );
}
