import { env } from "@/env";
import Link from "next/link";

import { WordLogo } from "@/components/word-logo";
import { Button } from "@coordinize/ui/components/button";
import { Icons } from "@coordinize/ui/icons";

const WEB_URL: string = env.NEXT_PUBLIC_WEB_URL;

export function Header() {
  return (
    <header className="box-border border-b">
      <div className="container mx-auto flex h-14 items-center justify-between px-5 ">
        <Link href={`${WEB_URL}`}>
          <WordLogo />
        </Link>
        <Button asChild size={"icon"} variant={"secondary"}>
          <Link href={`${WEB_URL}`}>
            <Icons.x className="size-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
