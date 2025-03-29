import { env } from "@/env";
import Link from "next/link";

import { WordLogo } from "@/components/word-logo";
import { Button } from "@coordinize/ui/components/button";
import { Icons } from "@coordinize/ui/icons";

const WEB_URL: string = env.NEXT_PUBLIC_WEB_URL;

export function Header() {
  return (
    <header className="border-b box-border">
      <div className="container mx-auto h-14 flex items-center justify-between">
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
