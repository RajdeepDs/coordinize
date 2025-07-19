import { Button } from '@coordinize/ui/components/button';
import Link from 'next/link';
import { env } from '@/env';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import { AnimatedGroup } from './animated-group';
import { HeroScreenshot } from './hero-screenshot';
import { WaitlistForm } from './waitlist-form';

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

export function HeroSection() {
  prefetch(trpc.earlyAccess.getWaitlistCount.queryOptions());
  return (
    <>
      <AnimatedGroup>
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

            <p className="font-semibold text-ui-gray-900 text-xl sm:hidden">
              Streamlined async communication for distributed teams worldwide.
            </p>
            <p className="hidden max-w-xl font-medium text-lg text-ui-gray-900 sm:block">
              Work smarter with purpose-driven async communication for modern
              teams. Streamline discussions, and build with clarity using posts.
            </p>
          </div>

          <div className="hidden items-center justify-center gap-2 sm:justify-start">
            <Button asChild size="sm" variant="default">
              <Link href={`${APP_URL}/join-waitlist`}>Join the waitlist</Link>
            </Button>
            <Button
              asChild
              className="hidden sm:inline-flex"
              size="sm"
              variant="ghost"
            >
              <Link
                href={'https://github.com/RajdeepDs/coordinize'}
                rel="noopener noreferrer"
                target="_blank"
              >
                Star on GitHub
              </Link>
            </Button>
          </div>

          <HydrateClient>
            <WaitlistForm />
          </HydrateClient>
        </div>
      </AnimatedGroup>

      <AnimatedGroup>
        <HeroScreenshot />
      </AnimatedGroup>
    </>
  );
}
