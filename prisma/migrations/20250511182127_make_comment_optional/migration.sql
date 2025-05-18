/*
  Warnings:

  - Added the required column `idFromuser` to the `CommentUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `commentuser` ADD COLUMN `idFromuser` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CommentUser` ADD CONSTRAINT `CommentUser_idFromuser_fkey` FOREIGN KEY (`idFromuser`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
