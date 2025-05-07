-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teamMember" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "joined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "team_workspaceId_idx" ON "team"("workspaceId");

-- CreateIndex
CREATE INDEX "team_createdBy_idx" ON "team"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "team_identifier_key" ON "team"("identifier");

-- CreateIndex
CREATE INDEX "teamMember_teamId_idx" ON "teamMember"("teamId");

-- CreateIndex
CREATE INDEX "teamMember_userId_idx" ON "teamMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "teamMember_teamId_userId_key" ON "teamMember"("teamId", "userId");
