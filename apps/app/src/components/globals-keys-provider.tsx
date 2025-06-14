"use client";

import { useGlobalHotkeys } from "@coordinize/ui/hooks";
import { useParams, useRouter } from "next/navigation";

export function GlobalsKeysProvider() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  // Get current slug from URL params
  const currentSlug = params?.slug;

  // Navigation shortcuts - only work when we have a valid slug
  // Use sequence syntax: "g h" means press g, then h
  useGlobalHotkeys({
    keys: "g>h",
    callback: () => {
      if (currentSlug) {
        router.push(`/${currentSlug}`);
      }
    },
    options: {
      enabled: !!currentSlug, // Only enable when slug is available
    },
  });

  useGlobalHotkeys({
    keys: "g>i",
    callback: () => {
      if (currentSlug) {
        router.push(`/${currentSlug}/inbox`);
      }
    },
    options: {
      enabled: !!currentSlug,
    },
  });

  return null;
}
