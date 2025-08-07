import prisma from "@/lib/prisma";
import { ApiResponse } from "@/types/ApiResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { statsResponse } from "@/types/stats.type";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Helper function to get sum by category
async function getCategoryDivisions(userId: string) {
    return await prisma.transactions.groupBy({
        by: ["category"],
        where: { userId },
        _sum: { amount: true },
    });
}

// Helper function to get sum by payment method
async function getPaymentMethodDivisions(userId: string) {
    return await prisma.transactions.groupBy({
        by: ["paymentMethod"],
        where: { userId },
        _sum: { amount: true },
    });
}

// Helper function to get total amount
async function getTotalAmount(userId: string) {
    return await prisma.transactions.aggregate({
        where: { userId },
        _sum: { amount: true },
    });
}

// Helper function to get the monthly sum for the last 31 days
async function getYearlySum(userId: string) {
    const monthlySum: { [key: string]: number } = {};
    const today = new Date();
    const thirtyOneDaysAgo = new Date();
    thirtyOneDaysAgo.setDate(today.getDate() - 365);

    // Initialize monthly sum for each day
    while (thirtyOneDaysAgo <= today) {
        const dateString = thirtyOneDaysAgo.toISOString().split("T")[0];
        monthlySum[dateString] = 0;
        thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() + 1);
    }

    // Fetch transactions for the last 31 days
    thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 365);
    const transactions = await prisma.transactions.findMany({
        where: {
            userId,
            createdAt: {
                gte: thirtyOneDaysAgo,
            },
        },
        orderBy: { createdAt: 'asc' },
    });

    // Sum up the amounts for each day
    for (const transaction of transactions) {
        const dateString = transaction.createdAt.toISOString().split("T")[0];
        monthlySum[dateString] += transaction.amount;
    }

    return monthlySum;
}

// Helper function to get the weekly sum for the last 7 days
async function getWeeklySum(userId: string) {
    const weeklySum: { [key: string]: number } = {};
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Initialize weekly sum for each day
    while (sevenDaysAgo <= today) {
        const dateString = sevenDaysAgo.toISOString().split("T")[0];
        weeklySum[dateString] = 0;
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 1);
    }

    // Fetch transactions for the last 7 days
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const transactions = await prisma.transactions.findMany({
        where: {
            userId,
            createdAt: {
                gt: sevenDaysAgo,
            },
        },
        orderBy: { createdAt: 'asc' },
    });

    // Sum up the amounts for each day
    for (const transaction of transactions) {
        const dateString = transaction.createdAt.toISOString().split("T")[0];
        weeklySum[dateString] += transaction.amount;
    }

    return weeklySum;
}

// Main handler function to get all required data
export async function GET(req: NextRequest) {
    const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({
                error: "Unauthorized user"
            }, { status: 401 });
        }

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    try {
        // Fetch all data
        const [categoryDivisions, paymentMethodDivisions, totalAmount, lastYear, lastWeek] = await Promise.all([
            getCategoryDivisions(userId),
            getPaymentMethodDivisions(userId),
            getTotalAmount(userId),
            getYearlySum(userId),
            getWeeklySum(userId),
        ]);

        // Return the structured JSON response
        const response : ApiResponse<statsResponse> = {
            success : true,
            message : "Stats calculated successfully",
            data :  {
                categoryDivisions,
                paymentMethodDivisions,
                totalAmount,
                lastYear,
                lastWeek,
            },
        }
        return NextResponse.json(response,{status : 200});
    } catch (error : any) {
        console.error(error.message);
        const errorResponse:ErrorResponse = {
            success : false,
            message : "Internal Server Error"
        }
        return NextResponse.json(errorResponse, { status: 500 });
    }
}
