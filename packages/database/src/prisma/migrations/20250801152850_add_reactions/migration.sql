-- CreateTable
CREATE TABLE "reaction" (
    "id" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reaction_postId_idx" ON "reaction"("postId");

-- CreateIndex
CREATE INDEX "reaction_userId_idx" ON "reaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "reaction_postId_userId_emoji_key" ON "reaction"("postId", "userId", "emoji");
