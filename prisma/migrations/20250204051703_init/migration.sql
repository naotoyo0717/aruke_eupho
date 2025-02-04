/*
  Warnings:

  - You are about to alter the column `content` on the `ReviewSpot` table. The data in that column could be lost. The data in that column will be cast from `VarChar(600)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "ReviewSpot" ALTER COLUMN "content" SET DATA TYPE VARCHAR(30);
