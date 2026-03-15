/*
  Warnings:

  - Added the required column `employer_id` to the `experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "experience" ADD COLUMN     "employer_id" UUID NOT NULL,
ADD COLUMN     "end_time" DATE NOT NULL,
ADD COLUMN     "start_time" DATE NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "shorthand_url" TEXT,
ADD COLUMN     "source_control_link" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "url" TEXT;

-- CreateTable
CREATE TABLE "education" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "degree" TEXT NOT NULL,
    "school_id" UUID NOT NULL,
    "start_time" DATE NOT NULL,
    "end_time" DATE NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schoool" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "school_name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "schoool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "employer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schoool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
