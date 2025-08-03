-- CreateTable
CREATE TABLE `followUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isFollow` BOOLEAN NOT NULL,
    `follower_id` INTEGER NOT NULL,
    `following_id` INTEGER NOT NULL,

    UNIQUE INDEX `followUser_follower_id_following_id_key`(`follower_id`, `following_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `followUser` ADD CONSTRAINT `followUser_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followUser` ADD CONSTRAINT `followUser_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
