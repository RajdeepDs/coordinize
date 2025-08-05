-- CreateTable
CREATE TABLE "commentReaction" (
    "id" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commentReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "commentReaction_commentId_idx" ON "commentReaction"("commentId");

-- CreateIndex
CREATE INDEX "commentReaction_userId_idx" ON "commentReaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "commentReaction_commentId_userId_emoji_key" ON "commentReaction"("commentId", "userId", "emoji");
