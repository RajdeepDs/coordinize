"use server";

import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "@coordinize/auth/auth";
import { getUserQuery } from "./index";

export const getSession = cache(async () => {
  const res = await auth.api.getSession({
    headers: await headers(),
  });

  return res?.session;
});

export const getUser = cache(async () => {
  const session = await getSession();

  const userId = session?.userId;

  if (!userId) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getUserQuery(userId);
    },
    ["user", userId],
    {
      tags: [`user_${userId}`],
      // 30 minutes
      revalidate: 1800,
    },
  )();
});
