/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Updates" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "datetime" TEXT NOT NULL,

    CONSTRAINT "Updates_pkey" PRIMARY KEY ("id")
);
