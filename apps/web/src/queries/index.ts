'use server';

import { database } from '@coordinize/database/db';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

export const getWaitlistCount = cache(async () => {
  return unstable_cache(
    async () => {
      return await database.earlyAccess.count();
    },
    ['waitlist-count'],
    {
      tags: ['waitlist'],
      revalidate: 60,
    }
  )();
});
