/*
  Warnings:

  - You are about to drop the `PublishedSites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PublishedSites" DROP CONSTRAINT "PublishedSites_user_site_id_fkey";

-- DropTable
DROP TABLE "PublishedSites";

-- CreateTable
CREATE TABLE "PublishedPages" (
    "id" SERIAL NOT NULL,
    "page_id" INTEGER NOT NULL,
    "published_data" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublishedPages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublishedPages_page_id_key" ON "PublishedPages"("page_id");

-- AddForeignKey
ALTER TABLE "PublishedPages" ADD CONSTRAINT "PublishedPages_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
