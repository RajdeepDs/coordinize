"use server";

import { database } from "@coordinize/database/db";

export const getWaitlistCount = async () => {
  return await database.earlyAccess.count();
};
