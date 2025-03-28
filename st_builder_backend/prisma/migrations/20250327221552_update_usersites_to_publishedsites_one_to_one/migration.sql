-- CreateTable
CREATE TABLE "PublishedSites" (
    "id" SERIAL NOT NULL,
    "user_site_id" INTEGER NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "site_data" TEXT NOT NULL,
    "site_address" TEXT NOT NULL,

    CONSTRAINT "PublishedSites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublishedSites_user_site_id_key" ON "PublishedSites"("user_site_id");

-- CreateIndex
CREATE UNIQUE INDEX "PublishedSites_site_address_key" ON "PublishedSites"("site_address");

-- AddForeignKey
ALTER TABLE "PublishedSites" ADD CONSTRAINT "PublishedSites_user_site_id_fkey" FOREIGN KEY ("user_site_id") REFERENCES "UsersSites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
