/*
  Warnings:

  - Made the column `userId` on table `Entry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Group` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Entry` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Group` MODIFY `userId` VARCHAR(191) NOT NULL;
