/*
  Warnings:

  - You are about to drop the column `slug` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sluggg]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sluggg` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Group_slug_key` ON `Group`;

-- AlterTable
ALTER TABLE `Group` DROP COLUMN `slug`,
    ADD COLUMN `sluggg` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Group_sluggg_key` ON `Group`(`sluggg`);
