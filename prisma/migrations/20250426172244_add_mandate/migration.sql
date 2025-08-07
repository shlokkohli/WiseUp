/*
  Warnings:

  - You are about to drop the `ExpenseSummary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseSummary" DROP CONSTRAINT "ExpenseSummary_userId_fkey";

-- DropTable
DROP TABLE "ExpenseSummary";

-- CreateTable
CREATE TABLE "mandates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentFor" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "repeat" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mandates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mandates" ADD CONSTRAINT "mandates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
