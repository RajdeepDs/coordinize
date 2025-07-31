'use client';

import { Button } from '@coordinize/ui/components/button';
import { Input } from '@coordinize/ui/components/input';
import { Label } from '@coordinize/ui/components/label';
import { useCallback, useEffect, useState } from 'react';
import {
  useCurrentInviteToken,
  useGenerateInviteToken,
} from '@/hooks/use-invites';
import { getUrl } from '@/utils/environment';

interface InviteProps {
  nextStep: () => void;
}

export function Invite({ nextStep }: InviteProps) {
  const [copied, setCopied] = useState(false);
  const [currentToken, setCurrentToken] = useState<string>('');
  const [usesLeft, setUsesLeft] = useState<number>(2);

  const url = getUrl();
  const inviteLink = currentToken ? `${url}/invite/${currentToken}` : '';

  const { data: existingTokenData, isLoading: isLoadingExisting } =
    useCurrentInviteToken();
  const generateToken = useGenerateInviteToken();

  const handleGenerateToken = useCallback(() => {
    generateToken.mutate(undefined, {
      onSuccess: (data) => {
        setCurrentToken(data.token);
        setUsesLeft(data.usesLeft);
      },
    });
  }, [generateToken]);

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

  useEffect(() => {
    if (existingTokenData) {
      setCurrentToken(existingTokenData.token);
      setUsesLeft(existingTokenData.usesLeft);
      return;
    }

    if (isLoadingExisting || generateToken.isPending || currentToken) {
      return;
    }

    handleGenerateToken();
  }, [
    existingTokenData,
    isLoadingExisting,
    handleGenerateToken,
    generateToken.isPending,
    currentToken,
  ]);

  const isLoading = isLoadingExisting || generateToken.isPending;

  return (
    <div className="flex w-full flex-col items-center space-y-8 px-4 text-center sm:px-0">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="font-medium text-lg">Invite co-workers to your team</h1>
        <p className="max-w-sm text-muted-foreground text-sm">
          Coordinize is meant to be used with your team. Invite some co-workers
          to test-it out with.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-md bg-background p-6 shadow-lg ring ring-ui-gray-400">
        <div className="flex flex-col gap-1">
          <Label>Invite link</Label>
          <p className="select-auto text-start text-sm text-ui-gray-900">
            Anyone with this link can join workspace. ({usesLeft} use
            {usesLeft !== 1 ? 's' : ''} remaining)
          </p>
        </div>
        <div className="flex w-lg items-center gap-2">
          <Input
            autoFocus={false}
            className="h-8 w-full px-1.5 shadow-none focus-visible:border-ui-gray-400 focus-visible:ring-0"
            disabled={isLoading}
            readOnly
            tabIndex={-1}
            value={isLoading ? 'Loading invite link...' : inviteLink}
          />
          <Button
            className="w-24"
            onClick={handleCopy}
            size={'sm'}
            variant="default"
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </div>
      <Button className="h-11 w-3xs" onClick={nextStep} size="lg">
        Continue
      </Button>
    </div>
  );
}
