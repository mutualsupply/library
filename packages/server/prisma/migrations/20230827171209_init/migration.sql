-- CreateEnum
CREATE TYPE "ENV" AS ENUM ('PROD', 'DEV');

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "env" "ENV" NOT NULL DEFAULT 'DEV';
