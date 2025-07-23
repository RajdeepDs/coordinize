import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import * as m from 'motion/react-client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export const metadata: Metadata = {
  title: 'Log in',
};

export default function LoginPage() {
  return (
    <m.div
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      className="w-full max-w-xs text-center"
      initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <div className="flex flex-col items-center space-y-9 text-center">
        <Logo />
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="font-medium text-lg">Log in to Coordinize</h1>
            <div className="space-y-3">
              <Button className="h-11 w-full" size={'lg'}>
                <Icons.google className="size-3 text-ui-gray-400" />
                Continue with Google
              </Button>
              <Button className="h-11 w-full" size={'lg'} variant={'outline'}>
                Continue with Email
              </Button>
            </div>
          </div>
          <p className="text-sm text-ui-gray-900">
            Don&apos;t have an account?{' '}
            <Link
              className="text-foreground underline-offset-1 hover:underline"
              href={'/sign-up'}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </m.div>
  );
}
