/*
  Warnings:

  - A unique constraint covering the columns `[identifier,workspaceId]` on the table `space` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "space_identifier_key";

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "authorId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "resolvedById" TEXT,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "post_authorId_idx" ON "post"("authorId");

-- CreateIndex
CREATE INDEX "post_spaceId_idx" ON "post"("spaceId");

-- CreateIndex
CREATE INDEX "post_resolvedById_idx" ON "post"("resolvedById");

-- CreateIndex
CREATE UNIQUE INDEX "space_identifier_workspaceId_key" ON "space"("identifier", "workspaceId");
