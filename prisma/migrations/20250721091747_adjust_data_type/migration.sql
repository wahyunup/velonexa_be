-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_feed_id_fkey`;

-- DropIndex
DROP INDEX `notification_feed_id_fkey` ON `notification`;

-- AlterTable
ALTER TABLE `notification` MODIFY `feed_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `notification_feed_id_fkey` FOREIGN KEY (`feed_id`) REFERENCES `feed`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
