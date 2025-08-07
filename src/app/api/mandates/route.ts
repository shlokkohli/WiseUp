import prisma from "@/lib/prisma";
import { TransactionCategory } from "@prisma/client";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// Helper to strip time and get only the date part (12 AM)
function getDateOnly(timestamp: number) {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

async function logEntry(mandate: any) {
  const logsPath = path.join(process.cwd(), "src/app/api/mandates/logs.json");
  let existingLogs = [];

  try {
    const data = await fs.readFile(logsPath, "utf8");
    existingLogs = JSON.parse(data);
  } catch (error) {
    console.error("Log file not found or unreadable, creating a new one.");
  }

  existingLogs.push(mandate);

  await fs.writeFile(logsPath, JSON.stringify(existingLogs, null, 2));
}

export async function GET(req: NextRequest) {
  const allMandates = await prisma.mandates.findMany();

  const today = getDateOnly(Date.now());

  for (let i = 0; i < allMandates.length; i++) {
    const mandate = allMandates[i];
    const startDateTimestamp = Number(mandate.startDate);
    const repeatDays = mandate.repeat;
    const amount = mandate.amount;
    const paymentMethod = mandate.paymentMethod;
    const paymentFor = mandate.paymentFor;
    const userId = mandate.userId;

    const startDate = getDateOnly(startDateTimestamp);

    if (today < startDate) {
      continue;
    }

    const timeDifferenceMs = today.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

    console.log("Days Difference:", daysDifference);

    if (daysDifference >= 0 && daysDifference % repeatDays === 0) {
      try {
        await prisma.transactions.create({
          data: {
            userId,
            paymentFor,
            paymentMethod,
            amount,
            category: TransactionCategory.OTHERS,
          },
        });
        console.log("Transaction Done");
      } catch (error: any) {
        console.error("Transaction creation failed, logging the mandate...");
        await logEntry(mandate);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to deduct mandate amount",
          },
          { status: 500 }
        );
      }
    }
    //  else {
    //   console.log("Not today for mandate");
    // }
  }

  return NextResponse.json({ message: "Mandate check complete." });
}
