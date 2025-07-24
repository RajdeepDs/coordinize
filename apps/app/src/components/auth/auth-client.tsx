'use client';

import { Button } from '@coordinize/ui/components/button';
import { Icons } from '@coordinize/ui/lib/icons';
import { AnimatePresence, motion as m } from 'motion/react';
import { useState } from 'react';
import { Logo } from '@/components/ui/logo';
import { EmailLink } from './email-link';

interface AuthClientProps {
  title: string;
  readonly children: React.ReactNode;
}

export function AuthClient({ title, children }: AuthClientProps) {
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  return (
    <m.div
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      className="w-full max-w-xs text-center"
      initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <div className="flex flex-col items-center space-y-9 text-center">
        <Logo />
        <AnimatePresence mode="wait">
          {isEmailLogin ? (
            <m.div
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              className="w-full"
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
              key="email-login"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <EmailLink onSetIsEmailLogin={setIsEmailLogin} />
            </m.div>
          ) : (
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
                    <Button className="h-11 w-full" size={'lg'}>
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
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}
