'use client';

import { Button } from '@coordinize/ui/components/button';
import { Input } from '@coordinize/ui/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion as m } from 'motion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type LoginCodeSchema, loginCodeSchema } from '@/lib/schemas/auth';

interface CheckYourEmailProps {
  email: string;
  onReset?: () => void;
}

export function CheckYourEmail({ email, onReset }: CheckYourEmailProps) {
  const [isLoginWithCode, setIsLoginWithCode] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginCodeSchema),
    defaultValues: { code: '' },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit = (_values: LoginCodeSchema) => {
    // TODO: Implement login logic
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h1 className="font-medium text-lg">Check your email</h1>
        <p className="text-sm text-ui-gray-900">
          We've sent you a temporary login {isLoginWithCode ? 'code' : 'link'}.{' '}
          <br /> Please check your inbox at{' '}
          <span className="text-foreground">{email}</span>.
        </p>
        {isLoginWithCode ? (
          <m.form
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className="space-y-3"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Input
              autoComplete="off"
              className="h-11 bg-transparent"
              placeholder="Enter code"
              type="text"
              {...register('code')}
            />
            {errors.code && (
              <p className="text-start text-ui-red-800 text-xs">
                {errors.code?.message}
              </p>
            )}
            <Button
              className="h-11 w-full"
              onClick={handleSubmit(onSubmit)}
              size={'lg'}
              variant={'outline'}
            >
              Continue with login code
            </Button>
          </m.form>
        ) : (
          <div className="space-y-3">
            <Button
              className="h-11 w-full"
              onClick={() => setIsLoginWithCode(true)}
              size={'lg'}
              variant={'outline'}
            >
              Enter code manually
            </Button>
          </div>
        )}
      </div>
      <Button
        className="px-0"
        onClick={() => {
          onReset?.();
        }}
        variant={'link'}
      >
        Back to login
      </Button>
    </div>
  );
}
