import { env } from "@/env";
import { Button } from "@coordinize/ui/components/button";
import Link from "next/link";

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

export default function Home() {
  return (
    <>
      {/* Semi circle  */}
      <div className="-translate-x-1/2 -top-0 pointer-events-none absolute left-1/2 h-[800px] w-[90%] max-w-[1600px]">
        <div className="h-full w-full rounded-b-full border-[#e6e6e6] border-b" />
      </div>

      {/* Left vertical line */}
      <div className="pointer-events-none absolute top-0 left-[8%] h-full w-[1px] bg-[#ebebeb]" />

      {/* Right vertical line */}
      <div className="pointer-events-none absolute top-0 right-[8%] h-full w-[1px] bg-[#ebebeb]" />

      <div className="z-10 flex min-h-[calc(100vh-4rem)] flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
        <span className="inline-flex items-center rounded-full border bg-[#FAFAFA] px-3 py-1 text-xs">
          Work Together, Async.
        </span>
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-bold text-[#171717] text-xl leading-tight sm:text-3xl">
            Rethinking Remote Work: Seamless Async Collaboration
          </h1>
          <p className="max-w-2xl text-[#7d7d7d] text-base">
            Work smarter with purpose-driven communication. Stay aligned,
            collaborate seamlessly,
            <br />
            and get things done—without the distractions of endless meetings.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant={"default"} className="font-normal" asChild>
            <Link href={`${APP_URL}/join-beta`}>Join private beta!</Link>
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
