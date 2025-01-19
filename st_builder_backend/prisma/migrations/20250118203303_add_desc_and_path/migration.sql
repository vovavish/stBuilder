/*
  Warnings:

  - Added the required column `description` to the `Layouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path_to_image` to the `Layouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Layouts" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "path_to_image" TEXT NOT NULL;
