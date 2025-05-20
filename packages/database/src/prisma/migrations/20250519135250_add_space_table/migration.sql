/*
  Warnings:

  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teamMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "team";

-- DropTable
DROP TABLE "teamMember";

-- CreateTable
CREATE TABLE "space" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "identifier" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spaceMember" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spaceMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "space_workspaceId_idx" ON "space"("workspaceId");

-- CreateIndex
CREATE INDEX "space_createdBy_idx" ON "space"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "space_identifier_key" ON "space"("identifier");

-- CreateIndex
CREATE INDEX "spaceMember_spaceId_idx" ON "spaceMember"("spaceId");

-- CreateIndex
CREATE INDEX "spaceMember_userId_idx" ON "spaceMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "spaceMember_spaceId_userId_key" ON "spaceMember"("spaceId", "userId");
