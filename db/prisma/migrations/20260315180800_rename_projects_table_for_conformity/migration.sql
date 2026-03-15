/*
  Warnings:

  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "projects";

-- CreateTable
CREATE TABLE "project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);
