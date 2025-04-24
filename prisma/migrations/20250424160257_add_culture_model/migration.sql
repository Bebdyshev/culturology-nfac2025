/*
  Warnings:

  - Added the required column `continent` to the `Culture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Culture" ADD COLUMN     "continent" TEXT NOT NULL;
