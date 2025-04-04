/*
  Warnings:

  - You are about to drop the column `site_data` on the `PublishedSites` table. All the data in the column will be lost.
  - You are about to drop the column `site_data` on the `UsersSites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PublishedSites" DROP COLUMN "site_data";

-- AlterTable
ALTER TABLE "UsersSites" DROP COLUMN "site_data";
