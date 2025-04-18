import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Header } from "@/components/header";
import { WEB_URL } from "@/utils/lib";
import { Button } from "@coordinize/ui/components/button";
import { Icons } from "@coordinize/ui/lib/icons";

const title = "Welcome to Coordinize";
const description = "Join the waitlist to get early access of the coordinize.";
const JoinWaitlist = dynamic(() =>
  import("@/components/auth/join-waitlist").then((mod) => mod.JoinWaitlist),
);

export const metadata: Metadata = {
  title: "Join waitlist",
};

export default function JoinWaitlistPage() {
  return (
    <>
      <Header>
        <Button asChild size={"icon"} variant={"secondary"}>
          <Link href={`${WEB_URL}`}>
            <Icons.x className="size-4" />
          </Link>
        </Button>
      </Header>
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[20rem] flex-col items-center justify-center gap-5">
        <span className="inline-flex w-fit items-center rounded-full border bg-muted px-3 py-1 text-center text-xs">
          Coming soon!
        </span>
        <div className="flex flex-col text-center">
          <h1 className="font-semibold text-base">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <JoinWaitlist />
      </div>
    </>
  );
}
