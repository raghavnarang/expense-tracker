/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Group_slug_key` ON `Group`(`slug`);
