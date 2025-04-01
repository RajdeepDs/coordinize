"use server";

import { database } from "@coordinize/database/db";

export async function getUserQuery(userId: string) {
  return await database.user.findUnique({ where: { id: userId } });
}
