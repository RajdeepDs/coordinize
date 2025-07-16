'use client';

import { toast } from 'sonner';
import { getUrl } from './environment';

/**
 * Copies the current page URL to clipboard
 */
export function copyPostLink(pathname: string) {
  const baseUrl = getUrl();
  const currentUrl = `${baseUrl}${pathname}`;

  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      toast.success('Post link copied to clipboard.');
    })
    .catch(() => {
      toast.error('Failed to copy link to clipboard.');
    });
}

/**
 * Copies the post ID to clipboard
 */
export function copyPostId(postId: string) {
  navigator.clipboard
    .writeText(postId)
    .then(() => {
      toast.success('Post ID copied to clipboard.');
    })
    .catch(() => {
      toast.error('Failed to copy post ID to clipboard.');
    });
}
