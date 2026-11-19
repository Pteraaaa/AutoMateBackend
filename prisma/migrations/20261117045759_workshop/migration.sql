/*
  Warnings:

  - Added the required column `address` to the `Workshop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Workshop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('ROUTINE', 'OIL_FILTER', 'BRAKES', 'ELECTRICAl', 'BODY_PAINT', 'TUNE_UP', 'EMERGENCY', 'MECHANIC');

-- AlterTable
ALTER TABLE "Workshop" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "serviceTypes" "ServiceType"[];
