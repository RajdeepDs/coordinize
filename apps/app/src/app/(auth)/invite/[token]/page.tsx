import { Button } from '@coordinize/ui/components/button';
import { Label } from '@coordinize/ui/components/label';
import { BoxLogo } from '@/components/ui/box-logo';

export default function InvitePage() {
  return (
    <main className="flex h-svh w-full flex-col items-center justify-center">
      <header className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <div className="flex flex-col gap-1 text-sm">
          <Label>Logged in as:</Label>
          <span className="text-ui-gray-900">rajdeepds626@gmail.com</span>
        </div>
        <div>
          <Button size={'sm'} variant={'ghost'}>
            Log out
          </Button>
        </div>
      </header>
      <div className="flex flex-col items-center gap-8 text-center">
        <BoxLogo className="size-14 rounded-sm" />
        <div className="space-y-4">
          <h1 className="font-bold text-3xl">Join Acme Inc.</h1>
          <p className="mt-2 text-ui-gray-900">
            You&apos;ve been invited to work async — without chaos. <br />
            Set up your profile and join the team to start collaborating in
            flow.
          </p>
        </div>
        <Button className="min-w-xs" size={'lg'} variant={'default'}>
          Continue
        </Button>
      </div>
    </main>
  );
}
