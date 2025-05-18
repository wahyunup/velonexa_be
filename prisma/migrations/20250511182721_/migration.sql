/*
  Warnings:

  - You are about to drop the column `idFromComment` on the `feed` table. All the data in the column will be lost.
  - Added the required column `feedId` to the `CommentUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `feed` DROP FOREIGN KEY `Feed_idFromComment_fkey`;

-- DropIndex
DROP INDEX `Feed_idFromComment_fkey` ON `feed`;

-- AlterTable
ALTER TABLE `commentuser` ADD COLUMN `feedId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `feed` DROP COLUMN `idFromComment`;

-- AddForeignKey
ALTER TABLE `CommentUser` ADD CONSTRAINT `CommentUser_feedId_fkey` FOREIGN KEY (`feedId`) REFERENCES `Feed`(`feedId`) ON DELETE RESTRICT ON UPDATE CASCADE;
