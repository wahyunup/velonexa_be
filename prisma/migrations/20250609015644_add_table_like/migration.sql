-- CreateTable
CREATE TABLE `like_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isLike` BOOLEAN NOT NULL,
    `user_id` INTEGER NOT NULL,
    `feed_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `like_user` ADD CONSTRAINT `like_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like_user` ADD CONSTRAINT `like_user_feed_id_fkey` FOREIGN KEY (`feed_id`) REFERENCES `feed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
