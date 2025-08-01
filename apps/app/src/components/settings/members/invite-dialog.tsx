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
import { useCallback, useEffect, useState } from 'react';
import {
  useCurrentInviteToken,
  useGenerateInviteToken,
  useResetInviteToken,
} from '@/hooks/use-invites';
import { getUrl } from '@/utils/environment';

export function InviteDialog() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentToken, setCurrentToken] = useState<string>('');
  const [usesLeft, setUsesLeft] = useState<number>(2);

  const url = getUrl();
  const inviteLink = currentToken ? `${url}/invite/${currentToken}` : '';

  const { data: existingTokenData, isLoading: isLoadingExisting } =
    useCurrentInviteToken();
  const generateToken = useGenerateInviteToken();
  const resetToken = useResetInviteToken();

  function handleCopy() {
    if (!inviteLink) {
      return;
    }

    navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const handleGenerateToken = useCallback(() => {
    generateToken.mutate(undefined, {
      onSuccess: (data) => {
        setCurrentToken(data.token);
        setUsesLeft(data.usesLeft);
      },
    });
  }, [generateToken]);

  function handleResetToken() {
    if (!currentToken) {
      return;
    }

    resetToken.mutate(undefined, {
      onSuccess: (data: { token: string }) => {
        setCurrentToken(data.token);
        setUsesLeft(2); // Reset to 2 uses
        setCopied(false);
      },
    });
  }

  // Load existing token when dialog opens
  useEffect(() => {
    if (!open) {
      setCopied(false);
      return;
    }

    if (existingTokenData) {
      setCurrentToken(existingTokenData.token);
      setUsesLeft(existingTokenData.usesLeft);
      return;
    }

    if (isLoadingExisting || generateToken.isPending || currentToken) {
      return;
    }

    // Generate new token only if no existing token
    handleGenerateToken();
  }, [
    open,
    existingTokenData,
    isLoadingExisting,
    handleGenerateToken,
    generateToken.isPending,
    currentToken,
  ]);

  const isLoading = isLoadingExisting || generateToken.isPending;

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
              Anyone with this link can join workspace. ({usesLeft} use
              {usesLeft !== 1 ? 's' : ''} remaining)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <Input
                autoFocus={false}
                className="h-8 px-1.5 pr-10 shadow-none focus-visible:border-ui-gray-400 focus-visible:ring-0"
                disabled={isLoading}
                readOnly
                tabIndex={-1}
                value={isLoading ? 'Loading invite link...' : inviteLink}
              />
              {isLoading ? (
                <div className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center">
                  <Icons.loader
                    aria-hidden="true"
                    className="animate-spin"
                    size={16}
                  />
                </div>
              ) : (
                <button
                  aria-label="Copy invite link"
                  className="absolute inset-y-0 end-0 flex h-full w-9 cursor-pointer items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!inviteLink}
                  onClick={handleCopy}
                  type="button"
                >
                  {copied ? (
                    <Icons.check aria-hidden="true" size={16} />
                  ) : (
                    <Icons.clipboard aria-hidden="true" size={16} />
                  )}
                </button>
              )}
            </div>
            <Button
              disabled={!currentToken || resetToken.isPending}
              onClick={handleResetToken}
              size={'sm'}
              variant="default"
            >
              {resetToken.isPending ? (
                <Icons.loader className="h-4 w-4 animate-spin" />
              ) : (
                'Reset'
              )}
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
