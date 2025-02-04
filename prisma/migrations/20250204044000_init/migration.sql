/*
  Warnings:

  - You are about to alter the column `title` on the `ReviewSpot` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `content` on the `ReviewSpot` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(600)`.

*/
-- AlterTable
ALTER TABLE "ReviewSpot" ALTER COLUMN "title" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "content" SET DATA TYPE VARCHAR(600);
