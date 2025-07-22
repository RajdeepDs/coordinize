-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('POST_COMMENT', 'POST_MENTION', 'POST_UPDATE', 'POST_RESOLVED', 'POST_REOPENED', 'SPACE_INVITE', 'WORKSPACE_INVITE');

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "actorId" TEXT,
    "subjectId" TEXT,
    "subjectType" TEXT,
    "workspaceId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notification_userId_idx" ON "notification"("userId");

-- CreateIndex
CREATE INDEX "notification_userId_read_idx" ON "notification"("userId", "read");

-- CreateIndex
CREATE INDEX "notification_workspaceId_idx" ON "notification"("workspaceId");

-- CreateIndex
CREATE INDEX "notification_actorId_idx" ON "notification"("actorId");

-- CreateIndex
CREATE INDEX "notification_subjectType_subjectId_idx" ON "notification"("subjectType", "subjectId");
