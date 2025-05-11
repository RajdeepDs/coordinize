import type { PrismaClient } from "@coordinize/database/db";
import { TRPCError } from "@trpc/server";

export async function joinWaitlist(
  db: PrismaClient,
  name: string,
  email: string,
) {
  const existing = await db.earlyAccess.findUnique({ where: { email } });

  if (existing) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Email already exists.",
    });
  }

  await db.earlyAccess.create({
    data: { name, email },
  });
}
