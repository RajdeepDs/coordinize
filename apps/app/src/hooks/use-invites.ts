import { toast } from '@coordinize/ui/components/sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function useCurrentInviteToken() {
  const trpc = useTRPC();

  return useQuery(
    trpc.invite.getCurrentToken.queryOptions(undefined, {
      staleTime: 5 * 60 * 1000,
    })
  );
}

export function useGenerateInviteToken() {
  const trpc = useTRPC();

  return useMutation(
    trpc.invite.generateToken.mutationOptions({
      onSuccess: () => {
        toast.success('Invite link ready.');
      },
      onError: () => {
        toast.error('Failed to generate invite link.');
      },
    })
  );
}

export function useInviteTokenInfo(token: string) {
  const trpc = useTRPC();

  return useQuery(
    trpc.invite.getTokenInfo.queryOptions(
      { token },
      {
        enabled: !!token,
        retry: false,
      }
    )
  );
}

export function useAcceptInvite() {
  const trpc = useTRPC();

  return useMutation(
    trpc.invite.acceptInvite.mutationOptions({
      onSuccess: () => {
        toast.success('Successfully joined workspace!');
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      },
    })
  );
}

export function useResetInviteToken() {
  const trpc = useTRPC();

  return useMutation(
    trpc.invite.resetToken.mutationOptions({
      onSuccess: () => {
        toast.success('Invite link reset successfully.');
      },
    })
  );
}
