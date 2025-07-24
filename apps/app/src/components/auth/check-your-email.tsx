'use client';

import { Button } from '@coordinize/ui/components/button';
import Link from 'next/link';

interface CheckYourEmailProps {
  email: string;
}

export function CheckYourEmail({ email }: CheckYourEmailProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h1 className="font-medium text-lg">Check your email</h1>
        <p>
          We've sent you a temporary login link. <br /> Please check your inbox
          at {email}
        </p>
        <div className="space-y-3">
          <Button className="h-11 w-full" size={'lg'} variant={'outline'}>
            Enter code manually
          </Button>
        </div>
      </div>
      <Button
        asChild
        className="px-0"
        onClick={(e) => {
          e.preventDefault();
        }}
        variant={'link'}
      >
        <Link
          className="text-foreground underline-offset-1 hover:underline"
          href={'/login'}
        >
          Back to login
        </Link>
      </Button>
    </div>
  );
}
