/*
  Warnings:

  - A unique constraint covering the columns `[user_site_id,page_slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Page_user_site_id_idx" ON "Page"("user_site_id");

-- CreateIndex
CREATE UNIQUE INDEX "Page_user_site_id_page_slug_key" ON "Page"("user_site_id", "page_slug");
