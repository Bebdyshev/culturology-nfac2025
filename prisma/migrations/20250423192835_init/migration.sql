-- CreateTable
CREATE TABLE "Culture" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "population" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "traditions" TEXT NOT NULL,
    "lifestyle" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Culture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Culture_key_key" ON "Culture"("key");
