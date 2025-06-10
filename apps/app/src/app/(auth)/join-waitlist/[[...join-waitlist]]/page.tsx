import { Logo } from "@/components/logo";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const title = "Welcome to Coordinize";
const description = "Join the waitlist to get early access to Coordinize!";
const JoinWaitlist = dynamic(() =>
  import("@/components/auth/join-waitlist").then((mod) => mod.JoinWaitlist),
);

export const metadata: Metadata = {
  title: "Join waitlist",
};

export default function JoinWaitlistPage() {
  return (
    <div className="mx-auto flex h-screen w-sm flex-col items-center justify-center gap-4 px-4">
      <Logo className="size-5" />
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="font-semibold text-lg">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <JoinWaitlist />
    </div>
  );
}
