'use client';

import { authClient } from '@coordinize/auth/auth-client';
import { Button } from '@coordinize/ui/button';
import { Label } from '@coordinize/ui/label';
import { useRouter } from 'next/navigation';
import { useUserQuery } from '@/hooks/use-user';

export function InviteHeader() {
  const router = useRouter();
  const { data: user } = useUserQuery();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  }

  return (
    <header className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
      <div className="flex select-none flex-col text-sm">
        <Label className="font-normal text-ui-gray-900">Logged in as:</Label>
        <span className="text-foreground">{user?.email}</span>
      </div>
      <Button
        className="text-foreground"
        onClick={handleLogout}
        size={'sm'}
        variant={'ghost'}
      >
        Log out
      </Button>
    </header>
  );
}
