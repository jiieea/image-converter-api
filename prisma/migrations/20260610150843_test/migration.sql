-- CreateTable
CREATE TABLE "Conversion" (
    "id" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "originalSize" INTEGER NOT NULL,
    "fromFormat" TEXT NOT NULL,
    "toFormat" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
