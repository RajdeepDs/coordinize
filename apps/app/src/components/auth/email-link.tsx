'use client';

import { Button } from '@coordinize/ui/components/button';
import { Input } from '@coordinize/ui/components/input';
import Link from 'next/link';

interface EmailLinkProps {
  onSetIsEmailLogin?: (isEmailLogin: boolean) => void;
}

export function EmailLink({ onSetIsEmailLogin }: EmailLinkProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h1 className="font-medium text-lg">What's your email address?</h1>
        <div className="space-y-3">
          <Input
            className="h-11 bg-transparent"
            placeholder="Enter your email address..."
            type="email"
          />
          <Button className="h-11 w-full" size={'lg'} variant={'outline'}>
            Continue with Email
          </Button>
        </div>
      </div>
      <Button
        asChild
        className="px-0"
        onClick={(e) => {
          e.preventDefault();
          onSetIsEmailLogin?.(false);
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
