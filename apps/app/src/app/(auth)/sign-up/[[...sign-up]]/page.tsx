import { Button } from '@coordinize/ui/components/button';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthClient } from '@/components/auth/auth-client';
import { PreserveCallbackLink } from '@/components/auth/preserve-callback-link';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function SignUpPage() {
  return (
    <AuthClient title="Create your workspace">
      <p className="text-sm text-ui-gray-900">
        Already have an account?{' '}
        <Button asChild className="px-0" variant={'link'}>
          <Suspense fallback={<span>Log in</span>}>
            <PreserveCallbackLink
              className="text-foreground underline-offset-1 hover:underline"
              href="/login"
            >
              Log in
            </PreserveCallbackLink>
          </Suspense>
        </Button>
      </p>
    </AuthClient>
  );
}
