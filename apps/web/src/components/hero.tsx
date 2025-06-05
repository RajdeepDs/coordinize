import Link from "next/link";

import { env } from "@/env";
import { getWaitlistCount } from "@/queries";
import { Button } from "@coordinize/ui/components/button";

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

export async function Hero() {
  const count = await getWaitlistCount();
  return (
    <div className="mx-auto flex flex-col gap-6 px-4 pt-14 sm:container">
      <div className="flex w-full flex-col items-center gap-2 text-center sm:items-start sm:text-start">
        <span className="hidden text-muted-foreground text-sm tracking-wide sm:inline-block">
          Collaborate seamlessly, anytime
        </span>

        <h1 className="w-full text-balance font-bold text-5xl leading-tight">
          <span className="block sm:hidden">The future of teamwork</span>
          <span className="hidden max-w-2xl sm:inline-block">
            Empower global teams with focused communication
          </span>
        </h1>

        <p className="font-semibold text-gray-900 text-xl sm:hidden">
          Streamlined async communication for distributed teams worldwide.
        </p>
        <p className="hidden max-w-xl font-medium text-gray-900 text-lg sm:block">
          Work smarter with purpose-driven async communication for modern teams.
          Streamline discussions, and build with clarity using posts.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <Button variant="default" size="sm" asChild>
          <Link href={`${APP_URL}/join-waitlist`}>Join the waitlist</Link>
        </Button>
        <Button
          className="hidden sm:inline-flex"
          variant="ghost"
          size="sm"
          asChild
        >
          <Link
            href={"https://github.com/RajdeepDs/coordinize"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Star on GitHub
          </Link>
        </Button>
      </div>

      <p className="text-center font-mono text-muted-foreground text-xs sm:text-start">
        {count} people have joined the waitlist
      </p>
    </div>
  );
}
