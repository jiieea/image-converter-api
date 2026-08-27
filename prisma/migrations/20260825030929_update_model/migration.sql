/*
  Warnings:

  - A unique constraint covering the columns `[ip,date]` on the table `UploadUsage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UploadUsage_ip_date_key" ON "UploadUsage"("ip", "date");
