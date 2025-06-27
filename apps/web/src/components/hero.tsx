import { Button } from '@coordinize/ui/components/button';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import { env } from '@/env';
import { getWaitlistCount } from '@/queries';
import { HeroScreenshot } from './hero-screenshot';

const APP_URL: string = env.NEXT_PUBLIC_APP_URL;

export async function HeroSection() {
  const count = await getWaitlistCount().catch(() => 0);

  return (
    <>
      <div>
        <motion.div
          animate={{
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
          }}
          className="mx-auto flex flex-col gap-6 px-4 pt-14 sm:container"
          initial={{
            opacity: 0,
            filter: 'blur(6px)',
            y: 24,
          }}
          transition={{
            ease: [0.25, 0.46, 0.45, 0.94],
            duration: 0.6,
            filter: { duration: 0.6 },
          }}
        >
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full flex-col items-center gap-2 text-center sm:items-start sm:text-start"
            initial={{ opacity: 0, y: 16 }}
            transition={{
              delay: 0.1,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
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
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 sm:justify-start"
            initial={{ opacity: 0, y: 12 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
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
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative mx-auto flex w-fit flex-row items-center gap-2 sm:mx-0"
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{
              delay: 0.5,
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <div className="size-2 rounded-full bg-ui-green-700" />
            <div className="absolute inset-x-0 size-2 rounded-full bg-green-600 blur-xs sm:left-0 dark:bg-green-400" />
            <span className="font-normal text-sm text-ui-green-900 sm:text-start">
              {count} {count === 1 ? 'person has' : 'people have'} joined the
              waitlist
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
        }}
        initial={{
          opacity: 0,
          y: 32,
          filter: 'blur(6px)',
          scale: 0.98,
        }}
        transition={{
          duration: 1,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <HeroScreenshot />
      </motion.div>
    </>
  );
}
