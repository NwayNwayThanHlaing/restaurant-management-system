-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('PROCESSING', 'DONE', 'CANCELLED', 'READY') NOT NULL;
