-- AlterTable
ALTER TABLE "PublishedSites" ALTER COLUMN "site_data" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UsersSites" ALTER COLUMN "site_data" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "user_site_id" INTEGER NOT NULL,
    "page_name" TEXT NOT NULL,
    "page_slug" TEXT NOT NULL,
    "page_data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_user_site_id_fkey" FOREIGN KEY ("user_site_id") REFERENCES "UsersSites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
