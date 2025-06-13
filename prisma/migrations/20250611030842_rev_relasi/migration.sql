/*
  Warnings:

  - A unique constraint covering the columns `[user_id,feed_id]` on the table `like_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `like_user_user_id_feed_id_key` ON `like_user`(`user_id`, `feed_id`);
