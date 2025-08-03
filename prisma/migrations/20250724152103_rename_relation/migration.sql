/*
  Warnings:

  - You are about to drop the `followuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `followuser` DROP FOREIGN KEY `followUser_follower_id_fkey`;

-- DropForeignKey
ALTER TABLE `followuser` DROP FOREIGN KEY `followUser_following_id_fkey`;

-- DropTable
DROP TABLE `followuser`;

-- CreateTable
CREATE TABLE `follow_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isFollow` BOOLEAN NOT NULL,
    `follower_id` INTEGER NOT NULL,
    `following_id` INTEGER NOT NULL,

    UNIQUE INDEX `follow_user_follower_id_following_id_key`(`follower_id`, `following_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `follow_user` ADD CONSTRAINT `follow_user_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follow_user` ADD CONSTRAINT `follow_user_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
