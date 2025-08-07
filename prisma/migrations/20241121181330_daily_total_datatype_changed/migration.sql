/*
  Warnings:

  - The `dailyTotal` column on the `ExpenseSummary` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ExpenseSummary" DROP COLUMN "dailyTotal",
ADD COLUMN     "dailyTotal" JSONB;
