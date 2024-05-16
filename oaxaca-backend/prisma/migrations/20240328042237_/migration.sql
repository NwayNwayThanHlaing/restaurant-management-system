-- AlterTable
ALTER TABLE `CallWaiter` MODIFY `reason` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('PROCESSING', 'DONE', 'CANCELLED', 'READY', 'PAID') NOT NULL;
