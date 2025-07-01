-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED';
