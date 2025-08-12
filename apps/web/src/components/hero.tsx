import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import type { Variants } from 'motion/react';
import Link from 'next/link';
import { env } from '@/env';
import { AnimatedGroup } from './animated-group';
import { HeroScreenshot } from './hero-screenshot';

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

const transitionVariants: Record<string, Variants> = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <>
      <AnimatedGroup variants={transitionVariants}>
        <div className="mx-auto flex flex-col gap-4 px-3 text-start sm:text-center md:max-w-xl lg:max-w-2xl">
          <h1 className="font-semibold text-4xl leading-10 sm:text-6xl sm:leading-16">
            Global teams. <br />
            Always aligned.
          </h1>
          <p className="text-base sm:text-lg">
            Work smarter with purpose-driven async communication for modern
            teams. Streamline discussions, and build with clarity using posts.
          </p>

          <div className="mt-5 flex items-start gap-2 sm:items-center sm:justify-center">
            <Button asChild className="w-fit" size={'lg'}>
              <Link href={`${APP_URL}/sign-up`}>Get Started</Link>
            </Button>
            <Button asChild className="w-fit" size={'lg'} variant={'ghost'}>
              <Link
                href={'https://github.com/RajdeepDs/coordinize'}
                rel="noopener noreferrer"
                target="_blank"
              >
                Introducing Coordinize <Icons.ChevronRight />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedGroup>
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.25,
              },
            },
          },
          ...transitionVariants,
        }}
      >
        <HeroScreenshot />
      </AnimatedGroup>
    </>
  );
}
