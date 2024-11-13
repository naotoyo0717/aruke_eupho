-- CreateTable
CREATE TABLE "Spot" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSpot" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "spotId" INTEGER NOT NULL,
    "visited" BOOLEAN NOT NULL DEFAULT false,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSpot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserSpot_userId_idx" ON "UserSpot"("userId");

-- CreateIndex
CREATE INDEX "UserSpot_spotId_idx" ON "UserSpot"("spotId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSpot_userId_spotId_key" ON "UserSpot"("userId", "spotId");

-- AddForeignKey
ALTER TABLE "UserSpot" ADD CONSTRAINT "UserSpot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpot" ADD CONSTRAINT "UserSpot_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
