-- CreateEnum
CREATE TYPE "OnboardingStep" AS ENUM ('WELCOME', 'WORKSPACE_SETUP', 'PREFERENCES');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "onboardingStep" "OnboardingStep" NOT NULL DEFAULT 'WELCOME';
