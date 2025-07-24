import { Button } from '@coordinize/ui/components/button';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthClient } from '@/components/auth/auth-client';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function SignUpPage() {
  return (
    <AuthClient title="Create your workspace">
      <p className="text-sm text-ui-gray-900">
        Already have an account?{' '}
        <Button asChild className="px-0" variant={'link'}>
          <Link
            className="text-foreground underline-offset-1 hover:underline"
            href={'/login'}
          >
            Log in
          </Link>
        </Button>
      </p>
    </AuthClient>
  );
}
