/*
  Warnings:

  - The primary key for the `feed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `feedId` on the `feed` table. All the data in the column will be lost.
  - You are about to drop the column `idFromUser` on the `feed` table. All the data in the column will be lost.
  - You are about to drop the column `isLike` on the `feed` table. All the data in the column will be lost.
  - You are about to drop the column `isSave` on the `feed` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `commentuser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `feed_id` to the `feed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `feed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `like_count` to the `feed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `save_count` to the `feed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `commentuser` DROP FOREIGN KEY `CommentUser_feedId_fkey`;

-- DropForeignKey
ALTER TABLE `commentuser` DROP FOREIGN KEY `CommentUser_idFromuser_fkey`;

-- DropForeignKey
ALTER TABLE `feed` DROP FOREIGN KEY `Feed_idFromUser_fkey`;

-- DropIndex
DROP INDEX `Feed_idFromUser_fkey` ON `feed`;

-- AlterTable
ALTER TABLE `feed` DROP PRIMARY KEY,
    DROP COLUMN `feedId`,
    DROP COLUMN `idFromUser`,
    DROP COLUMN `isLike`,
    DROP COLUMN `isSave`,
    ADD COLUMN `feed_id` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `like_count` INTEGER NOT NULL,
    ADD COLUMN `save_count` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `userId`,
    ADD COLUMN `display_name` VARCHAR(191) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `commentuser`;

-- CreateTable
CREATE TABLE `comment_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `field_comment` VARCHAR(191) NOT NULL,
    `like_count` INTEGER NOT NULL,
    `comment_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `comment_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feed` ADD CONSTRAINT `feed_feed_id_fkey` FOREIGN KEY (`feed_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_user` ADD CONSTRAINT `comment_user_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `feed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
