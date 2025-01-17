-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[];
