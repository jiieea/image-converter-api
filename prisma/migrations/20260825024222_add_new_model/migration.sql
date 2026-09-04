-- CreateTable
CREATE TABLE "UploadUsage" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "date" DATE NOT NULL,

    CONSTRAINT "UploadUsage_pkey" PRIMARY KEY ("id")
);
