/*
  Warnings:

  - The values [ELECTRICAl] on the enum `ServiceType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `serviceTypes` on the `Workshop` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[licensePlate]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `latitude` to the `Workshop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Workshop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterEnum
ALTER TYPE "ServiceType"
RENAME VALUE 'ELECTRICAl' TO 'ELECTRICAL';

-- DropIndex
DROP INDEX "Car_ownerId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Workshop" DROP COLUMN "serviceTypes",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;

-- CreateTable
CREATE TABLE "WorkshopService" (
    "id" SERIAL NOT NULL,
    "service" "ServiceType" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "duration" INTEGER,
    "workshopId" INTEGER NOT NULL,

    CONSTRAINT "WorkshopService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "appointmentAt" TIMESTAMP(3) NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "workshopId" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingService" (
    "id" SERIAL NOT NULL,
    "bookedPrice" DECIMAL(10,2) NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "workshopServiceId" INTEGER NOT NULL,

    CONSTRAINT "BookingService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopService_workshopId_service_key" ON "WorkshopService"("workshopId", "service");

-- CreateIndex
CREATE UNIQUE INDEX "BookingService_bookingId_workshopServiceId_key" ON "BookingService"("bookingId", "workshopServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "Car"("licensePlate");

-- AddForeignKey
ALTER TABLE "WorkshopService" ADD CONSTRAINT "WorkshopService_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingService" ADD CONSTRAINT "BookingService_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingService" ADD CONSTRAINT "BookingService_workshopServiceId_fkey" FOREIGN KEY ("workshopServiceId") REFERENCES "WorkshopService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
