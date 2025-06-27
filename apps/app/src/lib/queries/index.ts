'use server';

import { database } from '@coordinize/database/db';

export async function getUserQuery(userId: string) {
  return await database.user.findUnique({ where: { id: userId } });
}

export async function getWorkspaceQuery(workspaceId: string) {
  return await database.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  });
}

export async function getSpacesQuery(workspaceId: string) {
  return await database.space.findMany({
    where: {
      workspaceId,
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
  });
}

export async function getWorkspaceMembersQuery(workspaceId: string) {
  return await database.workspaceMember.findMany({
    where: {
      workspaceId,
    },
    include: {
      user: true,
    },
  });
}
