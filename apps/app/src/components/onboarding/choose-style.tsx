'use client';

import { Button } from '@coordinize/ui/components/button';
import { Label } from '@coordinize/ui/components/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@coordinize/ui/components/radio-group';
import { cn } from '@coordinize/ui/lib/utils';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ChooseStyleProps {
  nextStep: () => void;
}

export function ChooseStyle({ nextStep }: ChooseStyleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center space-y-8 px-4 text-center sm:px-0">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="font-medium text-lg">Choose your style</h1>
        <p className="max-w-sm text-muted-foreground text-sm">
          You can always switch later in settings or via the command menu.
        </p>
      </div>

      <RadioGroup
        className="flex max-w-sm flex-col gap-0 divide-y rounded-md border sm:max-w-full sm:flex-row sm:divide-x sm:divide-y-0"
        onValueChange={setTheme}
        value={theme}
      >
        {[
          { id: 'light', label: 'Light', image: '/ui-light.webp' },
          { id: 'dark', label: 'Dark', image: '/ui-dark.webp' },
        ].map(({ id, label, image }) => (
          <label
            className="group relative cursor-pointer px-14 pt-10 pb-12 text-center transition-colors"
            htmlFor={`theme-${id}`}
            key={id}
          >
            <RadioGroupItem
              className="peer sr-only"
              id={`theme-${id}`}
              value={id}
            />
            <Image
              alt={`${label} theme`}
              className={cn('rounded ring transition-all duration-200', {
                'outline-2 outline-primary outline-offset-3': theme === id,
              })}
              height={120}
              priority
              src={image}
              width={120}
            />
            <Label className="justify-center-safe absolute inset-x-0 bottom-4 items-center font-normal text-sm">
              {label}
            </Label>
          </label>
        ))}
      </RadioGroup>

      <Button className="h-11 w-3xs" onClick={nextStep} size="lg">
        Continue
      </Button>
    </div>
  );
}
