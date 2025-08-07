-- AlterTable
ALTER TABLE "User" ADD COLUMN     "budget" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Transactions_userId_createdAt_idx" ON "Transactions"("userId", "createdAt");
