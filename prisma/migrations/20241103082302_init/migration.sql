/*
  Warnings:

  - Added the required column `quantity` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPaid` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderproduct` ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `totalPaid` INTEGER NOT NULL;
