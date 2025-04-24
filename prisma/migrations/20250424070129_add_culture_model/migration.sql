/*
  Warnings:

  - You are about to alter the column `coordinates` on the `Culture` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `description` to the `Culture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Culture" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "coordinates" SET DATA TYPE INTEGER[];
