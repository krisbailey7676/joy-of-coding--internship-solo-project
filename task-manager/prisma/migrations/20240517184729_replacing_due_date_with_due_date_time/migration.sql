/*
  Warnings:

  - You are about to drop the column `dueDate` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `dueDate`,
    ADD COLUMN `dueDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
