"use server";

import { database as db } from "@coordinize/database/db";
import { actionClient } from "./safe-action";
import { joinWaitlistSchema } from "./schema";

export const joinWaitlistAction = actionClient
  .schema(joinWaitlistSchema)
  .action(async ({ parsedInput: { name, email } }) => {
    const existing = await db.earlyAccess.findUnique({ where: { email } });

    if (existing) {
      throw Error("This email is already on the waitlist.");
    }

    await db.earlyAccess.create({
      data: { name, email },
    });
  });
