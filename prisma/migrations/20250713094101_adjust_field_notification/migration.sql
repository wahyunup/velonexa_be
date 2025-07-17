/*
  Warnings:

  - You are about to drop the column `actorId` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `feedId` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `notification` table. All the data in the column will be lost.
  - Added the required column `actor_id` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feed_id` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_id` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_actorId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_feedId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_targetId_fkey`;

-- DropIndex
DROP INDEX `notification_actorId_fkey` ON `notification`;

-- DropIndex
DROP INDEX `notification_feedId_fkey` ON `notification`;

-- DropIndex
DROP INDEX `notification_targetId_fkey` ON `notification`;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `actorId`,
    DROP COLUMN `feedId`,
    DROP COLUMN `targetId`,
    ADD COLUMN `actor_id` INTEGER NOT NULL,
    ADD COLUMN `feed_id` INTEGER NOT NULL,
    ADD COLUMN `target_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_actor_id_fkey` FOREIGN KEY (`actor_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_target_id_fkey` FOREIGN KEY (`target_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_feed_id_fkey` FOREIGN KEY (`feed_id`) REFERENCES `feed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
