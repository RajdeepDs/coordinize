'use client';

import { authClient } from '@coordinize/auth/auth-client';
import { Button } from '@coordinize/ui/components/button';
import { redirect } from 'next/navigation';
import { Header } from '@/components/ui/header';

export function OnboardingHeader() {
  return (
    <Header>
      <Button
        onClick={async () =>
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                redirect('/private-beta');
              },
            },
          })
        }
        size={'sm'}
        variant={'ghost'}
      >
        Log out
      </Button>
    </Header>
  );
}
