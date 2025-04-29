-- AlterTable
ALTER TABLE "user" ADD COLUMN     "defaultWorkspace" TEXT;

-- CreateIndex
CREATE INDEX "user_defaultWorkspace_idx" ON "user"("defaultWorkspace");
