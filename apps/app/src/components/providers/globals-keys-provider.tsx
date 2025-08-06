'use client';

import { useGlobalHotkeys } from '@coordinize/ui/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function GlobalsKeysProvider() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(undefined);

  useEffect(() => {
    setCurrentSlug(params?.slug);
  }, [params.slug]);

  // Navigation shortcuts - only work when we have a valid slug
  // Use sequence syntax: "g>h" means press g, then h
  useGlobalHotkeys({
    keys: 'g>h',
    callback: () => {
      if (currentSlug) {
        router.push(`/${currentSlug}`);
      }
    },
    options: {
      enabled: !!currentSlug,
    },
  });

  useGlobalHotkeys({
    keys: 'g>i',
    callback: () => {
      if (currentSlug) {
        router.push(`/${currentSlug}/inbox`);
      }
    },
    options: {
      enabled: !!currentSlug,
    },
  });
  useGlobalHotkeys({
    keys: 'g>s',
    callback: () => {
      if (currentSlug) {
        router.push(`/${currentSlug}/settings/preferences`);
      }
    },
    options: {
      enabled: !!currentSlug,
    },
  });
  useGlobalHotkeys({
    keys: 'esc',
    callback: () => {
      // Check if there are any open popovers, dialogs, dropdowns, etc.
      // These elements typically have data attributes or specific roles
      const openElements = document.querySelectorAll(
        [
          '[data-state="open"]', // Radix UI elements (popover, dialog, dropdown, etc.)
          '[data-radix-popper-content-wrapper]', // Radix popper content
          '[role="dialog"]', // ARIA dialogs
          '[role="menu"]', // ARIA menus
          '[role="listbox"]', // ARIA listboxes
          '.popover', // Custom popover classes
          '.dropdown', // Custom dropdown classes
          '.modal', // Custom modal classes
        ].join(', ')
      );

      // If there are open elements, let them handle the escape key
      if (openElements.length > 0) {
        return;
      }

      // Only navigate back if no UI elements are open
      if (currentSlug) {
        router.back();
      }
    },
    options: {
      enabled: !!currentSlug,
    },
  });

  return null;
}
