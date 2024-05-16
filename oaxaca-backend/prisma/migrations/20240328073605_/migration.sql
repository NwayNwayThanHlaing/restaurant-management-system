-- AlterTable
ALTER TABLE `Menu` MODIFY `calories` VARCHAR(191) NULL,
    MODIFY `allergens` VARCHAR(191) NULL DEFAULT '',
    MODIFY `spice` VARCHAR(191) NULL DEFAULT '',
    MODIFY `description` VARCHAR(191) NULL;
