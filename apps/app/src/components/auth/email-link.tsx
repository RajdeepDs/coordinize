'use client';

import { authClient } from '@coordinize/auth/auth-client';
import { Button } from '@coordinize/ui/components/button';
import { Input } from '@coordinize/ui/components/input';
import { toast } from '@coordinize/ui/components/sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { type EmailLinkSchema, emailLinkSchema } from '@/lib/schemas/auth';

interface EmailLinkProps {
  onSetIsEmailLogin: (isEmailLogin: boolean) => void;
  onEmailSubmit: (email: string) => void;
}

export function EmailLink({
  onSetIsEmailLogin,
  onEmailSubmit,
}: EmailLinkProps) {
  const searchParams = useSearchParams();
  const form = useForm({
    resolver: zodResolver(emailLinkSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (values: EmailLinkSchema) => {
    const callbackUrl = searchParams.get('callbackUrl');
    const { error } = await authClient.signIn.magicLink({
      email: values.email,
      callbackURL: callbackUrl || undefined,
    });

    if (error) {
      toast.error('Error sending magic link. Please try again.');
      return;
    }

    onEmailSubmit(values.email);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h1 className="font-medium text-lg">What's your email address?</h1>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            aria-describedby="code-error"
            aria-label="Login email"
            autoComplete="off"
            className="h-11 bg-transparent"
            placeholder="Enter your email address..."
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <p
              className="text-start text-ui-red-800 text-xs"
              id="code-error"
              role="alert"
            >
              {errors.email?.message}
            </p>
          )}
          <Button
            className="h-11 w-full"
            size={'lg'}
            type="submit"
            variant={'outline'}
          >
            Continue with Email
          </Button>
        </form>
      </div>
      <Button
        className="px-0"
        onClick={() => {
          onSetIsEmailLogin(false);
        }}
        variant={'link'}
      >
        Back to login
      </Button>
    </div>
  );
}
