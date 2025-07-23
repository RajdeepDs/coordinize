import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import * as m from 'motion/react-client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function SignUpPage() {
  return (
    <m.div
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      className="w-full max-w-xs text-center"
      initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <div className="space-y-9">
        <div className="flex flex-col items-center gap-8 text-center">
          <Logo />
          <div className="space-y-6">
            <h1 className="font-medium text-lg">Create your workspace</h1>
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
        </div>
        <p className="text-sm text-ui-gray-900">
          Already have an account?{' '}
          <Link
            className="text-foreground underline-offset-1 hover:underline"
            href={'/login'}
          >
            Log in
          </Link>
        </p>
      </div>
    </m.div>
  );
}
