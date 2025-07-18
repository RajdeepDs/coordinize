/*
  Warnings:

  - The values [CREATED,PINNED,UNPINNED] on the enum `TimelineAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TimelineAction_new" AS ENUM ('UPDATED_TITLE', 'MOVED_SPACE', 'RESOLVED', 'REOPENED', 'COMMENTED');
ALTER TABLE "timelineEvent" ALTER COLUMN "action" TYPE "TimelineAction_new" USING ("action"::text::"TimelineAction_new");
ALTER TYPE "TimelineAction" RENAME TO "TimelineAction_old";
ALTER TYPE "TimelineAction_new" RENAME TO "TimelineAction";
DROP TYPE "TimelineAction_old";
COMMIT;

-- CreateIndex
CREATE INDEX "timelineEvent_subjectId_idx" ON "timelineEvent"("subjectId");
