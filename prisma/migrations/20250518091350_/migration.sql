/*
  Warnings:

  - You are about to drop the column `comment_id` on the `comment_user` table. All the data in the column will be lost.
  - You are about to drop the column `feed_id` on the `feed` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `feed_id` to the `comment_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comment_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `feed` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment_user` DROP FOREIGN KEY `comment_user_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `feed` DROP FOREIGN KEY `feed_feed_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_user_id_fkey`;

-- DropIndex
DROP INDEX `comment_user_comment_id_fkey` ON `comment_user`;

-- DropIndex
DROP INDEX `feed_feed_id_fkey` ON `feed`;

-- DropIndex
DROP INDEX `user_user_id_fkey` ON `user`;

-- AlterTable
ALTER TABLE `comment_user` DROP COLUMN `comment_id`,
    ADD COLUMN `feed_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `feed` DROP COLUMN `feed_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `user_id`;

-- AddForeignKey
ALTER TABLE `feed` ADD CONSTRAINT `feed_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_user` ADD CONSTRAINT `comment_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_user` ADD CONSTRAINT `comment_user_feed_id_fkey` FOREIGN KEY (`feed_id`) REFERENCES `feed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
