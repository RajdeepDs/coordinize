import { env } from "@/env";
import { Button } from "@coordinize/ui/components/button";
import Link from "next/link";

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

export default function Home() {
  return (
    <>
      <div className="-translate-x-1/2 -top-0 pointer-events-none absolute left-1/2 hidden h-[800px] w-[90%] max-w-[1600px] sm:block">
        <div className="h-full w-full rounded-b-full border-border border-b" />
      </div>
      <div className="z-10 flex min-h-[calc(100vh-4rem)] flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
        <span className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-xs">
          Work Together, Async.
        </span>
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-bold text-xl leading-tight sm:text-3xl">
            Rethinking Remote Work: Seamless Async Collaboration
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Work smarter with purpose-driven communication. Stay aligned,
            collaborate seamlessly,
            <br className="hidden sm:block" />
            and get things done—without the distractions of endless meetings.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant={"default"} className="font-normal" asChild>
            <Link href={`${APP_URL}/join-waitlist`}>Join private beta!</Link>
          </Button>
          <Button variant={"outline"} className="font-normal" asChild>
            <Link
              href="https://github.com/Coordinize/coordinize"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
