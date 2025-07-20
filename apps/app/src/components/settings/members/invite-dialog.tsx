'use client';

import { Button } from '@coordinize/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@coordinize/ui/dialog';
import { Icons } from '@coordinize/ui/icons';
import { Input } from '@coordinize/ui/input';
import { Label } from '@coordinize/ui/label';
import { useEffect, useState } from 'react';
import { getUrl } from '@/utils/environment';

export function InviteDialog() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = getUrl();
  const token = 'your-invite-token'; // Replace with actual token logic
  const inviteLink = `${url}/invite/${token}`;

  function handleCopy() {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  useEffect(() => {
    if (open) {
      setCopied(false);
    }
  }, [open]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          className="ml-auto font-normal"
          size={'sm'}
          tooltip="Invite people"
          variant="default"
        >
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-3 overflow-clip p-0 shadow-xl/5 [&>button:last-child]:top-3.5">
        <DialogTitle className="sr-only">Invite people</DialogTitle>
        <DialogDescription className="sr-only">
          Invite your team members to collaborate.
        </DialogDescription>
        <div className="flex flex-col gap-4 p-3.5">
          <div className="flex flex-col gap-1">
            <Label>Invite link</Label>
            <p className="select-auto text-sm text-ui-gray-900">
              Anyone with this link can join workspace.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <Input
                autoFocus={false}
                className="h-8 px-1.5 shadow-none focus-visible:border-ui-gray-400 focus-visible:ring-0 "
                readOnly
                tabIndex={-1}
                value={inviteLink}
              />
              <button
                aria-label="Copy invite link"
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 "
                onClick={handleCopy}
                type="button"
              >
                {copied ? (
                  <Icons.check aria-hidden="true" size={16} />
                ) : (
                  <Icons.clipboard aria-hidden="true" size={16} />
                )}
              </button>
            </div>
            {/* Reset button to generate new token */}
            <Button size={'sm'} variant="default">
              Reset
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between border-t bg-background-200 px-3.5 py-2.5">
          <Button
            className="text-foreground"
            onClick={() => setOpen(false)}
            size={'sm'}
            variant={'ghost'}
          >
            Manage members
          </Button>
          <Button
            className="text-foreground"
            onClick={() => setOpen(false)}
            size={'sm'}
            variant={'ghost'}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
