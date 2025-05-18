-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `nameDisplay` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `imageProfile` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feed` (
    `feedId` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `isLike` BOOLEAN NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `isSave` BOOLEAN NOT NULL,
    `idFromComment` INTEGER NOT NULL,
    `idFromUser` INTEGER NOT NULL,

    PRIMARY KEY (`feedId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentUser` (
    `Commentid` INTEGER NOT NULL AUTO_INCREMENT,
    `fieldComment` VARCHAR(191) NOT NULL,
    `isLike` BOOLEAN NOT NULL,

    PRIMARY KEY (`Commentid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Feed` ADD CONSTRAINT `Feed_idFromComment_fkey` FOREIGN KEY (`idFromComment`) REFERENCES `CommentUser`(`Commentid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feed` ADD CONSTRAINT `Feed_idFromUser_fkey` FOREIGN KEY (`idFromUser`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
