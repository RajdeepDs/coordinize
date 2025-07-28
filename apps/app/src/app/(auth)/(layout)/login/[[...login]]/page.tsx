import { Button } from '@coordinize/ui/components/button';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthClient } from '@/components/auth/auth-client';
import { PreserveCallbackLink } from '@/components/auth/preserve-callback-link';

export const metadata: Metadata = {
  title: 'Log in',
};

export default function LoginPage() {
  return (
    <AuthClient title="Log in to Coordinize">
      <p className="text-sm text-ui-gray-900">
        Don&apos;t have an account?{' '}
        <Button asChild className="px-0" variant={'link'}>
          <Suspense fallback={<span>Sign up</span>}>
            <PreserveCallbackLink
              className="text-foreground underline-offset-1 hover:underline"
              href="/sign-up"
            >
              Sign up
            </PreserveCallbackLink>
          </Suspense>
        </Button>
      </p>
    </AuthClient>
  );
}
