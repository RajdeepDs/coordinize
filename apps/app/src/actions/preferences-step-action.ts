"use server";

import { authActionClient } from "./safe-action";
import { preferencesStepSchema } from "./schema";

export const preferencesStepAction = authActionClient
  .metadata({
    name: "preferences-step",
  })
  .schema(preferencesStepSchema)
  .action(
    async ({
      parsedInput: { emailNotifications, pushNotifications, timezone },
      ctx: { user, db },
    }) => {
      await db.notificationPreference.create({
        data: {
          emailNotifications,
          pushNotifications,
          userId: user.id,
        },
      });

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          timezone,
          onboarded: true,
        },
      });
    },
  );
