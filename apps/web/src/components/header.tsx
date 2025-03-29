import { env } from "@/env";
import Link from "next/link";

import { WordLogo } from "@/components/word-logo";
import { Button } from "@coordinize/ui/components/button";

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

export function Header() {
  return (
    <header className="flex h-16 justify-center border-b">
      <div className="container flex items-center justify-between">
        <Link href={"/"}>
          <WordLogo />
        </Link>
        <Button asChild>
          <Link href={`${APP_URL}/sign-in`}>Sign in</Link>
        </Button>
      </div>
    </header>
  );
}
