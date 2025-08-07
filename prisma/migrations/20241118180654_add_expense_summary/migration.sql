-- CreateTable
CREATE TABLE "ExpenseSummary" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dailyTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weeklyTotals" JSONB NOT NULL,
    "categoryTotals" JSONB NOT NULL,

    CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpenseSummary" ADD CONSTRAINT "ExpenseSummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
