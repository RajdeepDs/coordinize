/*
  Warnings:

  - You are about to drop the `invitePeople` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "invitePeople";

-- CreateTable
CREATE TABLE "inviteToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "usesLeft" INTEGER NOT NULL DEFAULT 2,
    "maxUses" INTEGER NOT NULL DEFAULT 2,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inviteToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inviteToken_token_key" ON "inviteToken"("token");

-- CreateIndex
CREATE INDEX "inviteToken_workspaceId_idx" ON "inviteToken"("workspaceId");

-- CreateIndex
CREATE INDEX "inviteToken_createdBy_idx" ON "inviteToken"("createdBy");
