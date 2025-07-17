-- CreateTable
CREATE TABLE "favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT,
    "spaceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "favorite_userId_idx" ON "favorite"("userId");

-- CreateIndex
CREATE INDEX "favorite_postId_idx" ON "favorite"("postId");

-- CreateIndex
CREATE INDEX "favorite_spaceId_idx" ON "favorite"("spaceId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_userId_postId_key" ON "favorite"("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_userId_spaceId_key" ON "favorite"("userId", "spaceId");
