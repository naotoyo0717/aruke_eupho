/*
  Warnings:

  - You are about to drop the column `recommend` on the `Spot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Spot" DROP COLUMN "recommend",
ADD COLUMN     "standard" BOOLEAN NOT NULL DEFAULT false;
