/*
  Warnings:

  - A unique constraint covering the columns `[site_address]` on the table `UsersSites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UsersSites_site_address_key" ON "UsersSites"("site_address");
