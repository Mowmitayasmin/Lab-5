-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
