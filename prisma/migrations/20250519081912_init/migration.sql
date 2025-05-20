-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
