import Link from "next/link";

import { WordLogo } from "@/components/word-logo";
import { WEB_URL } from "@/utils/lib";

interface HeaderProps {
  readonly children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="box-border border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-5 ">
        <Link href={`${WEB_URL}`}>
          <WordLogo />
        </Link>
        {children}
      </div>
    </header>
  );
}
