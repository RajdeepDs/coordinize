-- CreateTable
CREATE TABLE "invitePeople" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "usesLeft" INTEGER NOT NULL DEFAULT 2,
    "maxUses" INTEGER NOT NULL DEFAULT 2,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitePeople_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitePeople_token_key" ON "invitePeople"("token");

-- CreateIndex
CREATE INDEX "invitePeople_workspaceId_idx" ON "invitePeople"("workspaceId");

-- CreateIndex
CREATE INDEX "invitePeople_createdBy_idx" ON "invitePeople"("createdBy");
