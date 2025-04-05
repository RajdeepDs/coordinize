"use server";

import { database as db } from "@coordinize/database/db";
import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { updateUserNameSchema } from "./schema";

export const updateUserNameAction = authActionClient
  .schema(updateUserNameSchema)
  .metadata({
    name: "update-profile",
  })
  .action(async ({ parsedInput: { name }, ctx }) => {
    await db.user.update({
      data: { name },
      where: { id: ctx.user.id },
    });

    revalidateTag(`user_${ctx.user.id}`);
  });
