"use server";

import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "@coordinize/auth/auth";
import {
  getTeamsQuery,
  getUserQuery,
  getWorkspaceMembersQuery,
  getWorkspaceQuery,
} from "./index";

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
      revalidate: 1800,
    },
  )();
});

export async function getCurrentUser() {
  const session = await getSession();

  const userId = session?.userId;

  if (!userId) {
    return null;
  }
  return getUserQuery(userId);
}

export const getCurrentWorkspace = cache(async () => {
  const user = await getUser();
  if (!user) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getWorkspaceQuery(user.defaultWorkspace as string);
    },
    ["workspace", user.defaultWorkspace!],
    {
      tags: [`workspace_${user.defaultWorkspace}`],
      // 30 minutes
      revalidate: 1800,
    },
  )();
});

export const getTeams = async () => {
  const workspace = await getCurrentWorkspace();

  if (!workspace) {
    return null;
  }

  const workspaceId = workspace.id;

  return unstable_cache(
    async () => {
      const teams = await getTeamsQuery(workspaceId);
      const mappedTeams = teams.map(({ _count, ...team }) => ({
        ...team,
        membersCount: _count.members, // rename the _count.members field to membersCount
      }));
      return mappedTeams;
    },
    ["teams", workspaceId],
    {
      tags: [`teams_${workspaceId}`],
      revalidate: 1800,
    },
  )();
};

export const getWorkspaceMembers = async () => {
  const workspace = await getCurrentWorkspace();

  if (!workspace) {
    return null;
  }

  const workspaceId = workspace.id;

  return unstable_cache(
    async () => {
      const members = await getWorkspaceMembersQuery(workspaceId);
      return members;
    },
    ["members", workspaceId],
    {
      tags: [`members_${workspaceId}`],
      revalidate: 1800,
    },
  )();
};
