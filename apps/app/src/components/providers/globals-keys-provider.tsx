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

  return null;
}
