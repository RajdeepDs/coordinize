'use client';

import { authClient } from '@coordinize/auth/auth-client';
import { Button } from '@coordinize/ui/components/button';
import { toast } from '@coordinize/ui/components/sonner';
import { Icons } from '@coordinize/ui/lib/icons';
import { AnimatePresence, motion as m } from 'motion/react';
import { useState } from 'react';
import { CheckYourEmail } from '@/components/auth/check-your-email';
import { EmailLink } from '@/components/auth/email-link';
import { Logo } from '@/components/ui/logo';

interface AuthClientProps {
  title: string;
  readonly children: React.ReactNode;
}

export function AuthClient({ title, children }: AuthClientProps) {
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleEmailSubmit = (email: string) => {
    setSubmittedEmail(email);
  };

  const handleReset = () => {
    setIsEmailLogin(false);
    setSubmittedEmail('');
  };

  const renderCurrentView = () => {
    if (submittedEmail) {
      return (
        <m.div
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          className="w-full"
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
          key="check-email"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <CheckYourEmail email={submittedEmail} onReset={handleReset} />
        </m.div>
      );
    }

    if (isEmailLogin) {
      return (
        <m.div
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          className="w-full"
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
          key="email-login"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <EmailLink
            onEmailSubmit={handleEmailSubmit}
            onSetIsEmailLogin={setIsEmailLogin}
          />
        </m.div>
      );
    }

    const handleGoogleLogin = async () => {
      try {
        setIsGoogleLoading(true);
        await authClient.signIn.social({ provider: 'google' });
      } catch {
        toast.error('Failed to sign in with Google. Please try again later.');
      } finally {
        setIsGoogleLoading(false);
      }
    };

    return (
      <m.div
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        className="w-full"
        exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
        key="auth-options"
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="font-medium text-lg">{title}</h1>
            <div className="space-y-3">
              <Button
                className="h-11 w-full"
                disabled={isGoogleLoading}
                onClick={handleGoogleLogin}
                size={'lg'}
              >
                <Icons.google className="size-3 text-ui-gray-400" />
                Continue with Google
              </Button>
              <Button
                className="h-11 w-full"
                onClick={() => setIsEmailLogin(true)}
                size={'lg'}
                variant={'outline'}
              >
                Continue with Email
              </Button>
            </div>
          </div>
          {children}
        </div>
      </m.div>
    );
  };

  return (
    <m.div
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      className="w-full max-w-xs text-center"
      initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <div className="flex flex-col items-center space-y-9 text-center">
        <Logo />
        <AnimatePresence mode="wait">{renderCurrentView()}</AnimatePresence>
      </div>
    </m.div>
  );
}
