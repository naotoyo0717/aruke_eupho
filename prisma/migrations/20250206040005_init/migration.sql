-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteSpot" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "spotId" INTEGER NOT NULL,

    CONSTRAINT "RouteSpot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RouteSpot_routeId_idx" ON "RouteSpot"("routeId");

-- CreateIndex
CREATE INDEX "RouteSpot_spotId_idx" ON "RouteSpot"("spotId");

-- CreateIndex
CREATE UNIQUE INDEX "RouteSpot_routeId_spotId_key" ON "RouteSpot"("routeId", "spotId");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteSpot" ADD CONSTRAINT "RouteSpot_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteSpot" ADD CONSTRAINT "RouteSpot_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
