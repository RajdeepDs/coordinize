/*
  Warnings:

  - You are about to drop the column `onboardingStep` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "onboardingStep";

-- DropEnum
DROP TYPE "OnboardingStep";
