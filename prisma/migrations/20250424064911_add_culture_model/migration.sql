/*
  Warnings:

  - You are about to drop the column `description` on the `Culture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Culture" DROP COLUMN "description",
ADD COLUMN     "coordinates" DOUBLE PRECISION[];
