/*
  Warnings:

  - You are about to drop the column `imageProfile` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nameDisplay` on the `user` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `imageProfile`,
    DROP COLUMN `nameDisplay`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
