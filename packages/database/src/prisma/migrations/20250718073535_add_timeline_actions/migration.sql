-- CreateEnum
CREATE TYPE "TimelineAction" AS ENUM ('UPDATED_TITLE', 'MOVED_SPACE', 'RESOLVED', 'REOPENED', 'COMMENTED', 'CREATED', 'PINNED', 'UNPINNED');

-- CreateTable
CREATE TABLE "timelineEvent" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorType" TEXT,
    "subjectType" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "referenceType" TEXT,
    "referenceId" TEXT,
    "action" "TimelineAction" NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "timelineEvent_action_idx" ON "timelineEvent"("action");

-- CreateIndex
CREATE INDEX "timelineEvent_actorType_actorId_idx" ON "timelineEvent"("actorType", "actorId");

-- CreateIndex
CREATE INDEX "timelineEvent_subjectType_subjectId_idx" ON "timelineEvent"("subjectType", "subjectId");

-- CreateIndex
CREATE INDEX "timelineEvent_referenceType_referenceId_idx" ON "timelineEvent"("referenceType", "referenceId");

-- CreateIndex
CREATE INDEX "timelineEvent_actorId_idx" ON "timelineEvent"("actorId");
