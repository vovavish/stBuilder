/*
  Warnings:

  - Added the required column `site_address` to the `UsersSites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsersSites" ADD COLUMN     "site_address" TEXT NOT NULL;
