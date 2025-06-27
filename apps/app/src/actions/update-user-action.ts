'use server';

import { revalidateTag } from 'next/cache';
import { authActionClient } from './safe-action';
import { updateProfileSchema } from './schema';

export const updateProfileAction = authActionClient
  .metadata({
    name: 'update-profile',
  })
  .schema(updateProfileSchema)
  .action(async ({ parsedInput, ctx: { user, db } }) => {
    const { preferredName, image } = parsedInput;

    // Build update object dynamically
    const updateData: Record<string, string> = {};
    if (preferredName) updateData.name = preferredName;
    if (image !== undefined) updateData.image = image;

    // Update only if there's something to update
    if (Object.keys(updateData).length > 0) {
      await db.user.update({
        where: { id: user.id },
        data: updateData,
      });

      revalidateTag(`user_${user.id}`);
    }
  });
