/*
  Warnings:

  - You are about to drop the column `follower_id` on the `follow_user` table. All the data in the column will be lost.
  - You are about to drop the column `following_id` on the `follow_user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,target_id]` on the table `follow_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `target_id` to the `follow_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `follow_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `follow_user` DROP FOREIGN KEY `follow_user_follower_id_fkey`;

-- DropForeignKey
ALTER TABLE `follow_user` DROP FOREIGN KEY `follow_user_following_id_fkey`;

-- DropIndex
DROP INDEX `follow_user_follower_id_following_id_key` ON `follow_user`;

-- DropIndex
DROP INDEX `follow_user_following_id_fkey` ON `follow_user`;

-- AlterTable
ALTER TABLE `follow_user` DROP COLUMN `follower_id`,
    DROP COLUMN `following_id`,
    ADD COLUMN `target_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `follow_user_user_id_target_id_key` ON `follow_user`(`user_id`, `target_id`);

-- AddForeignKey
ALTER TABLE `follow_user` ADD CONSTRAINT `follow_user_target_id_fkey` FOREIGN KEY (`target_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follow_user` ADD CONSTRAINT `follow_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
