-- AlterTable
ALTER TABLE `User` ADD COLUMN `schoolStatus` VARCHAR(191) NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE `Questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questions` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
