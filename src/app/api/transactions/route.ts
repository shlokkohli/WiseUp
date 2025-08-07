import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { TransactionCategory, PaymentMethod } from "@prisma/client";



export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({
            error: "Unauthorized user"
        }, { status: 401 });
    }

    try {
        const { paymentMethod, paymentFor, amount, category } = await req.json();
        
        if (!paymentFor || !paymentMethod || !amount || !category) {
            return NextResponse.json({
                error: "Incomplete field"
            }, { status: 400 });
        }

        if (!Object.values(TransactionCategory).includes(category as TransactionCategory)) {
            return NextResponse.json({
                error: "Invalid transaction category"
            }, { status: 400 });
        }

        if (!Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod)) {
            return NextResponse.json({
                error: "Invalid payment method"
            }, { status: 400 });
        }

        // Get the start of the current day (midnight) to check daily transactions
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const transactionCount = await prisma.transactions.count({
            where: {
                userId,
                createdAt: {
                    gte: startOfDay
                }
            }
        });

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        const budget = user?.budget;
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthlyTransactions = await prisma.transactions.aggregate({
            where : {
                createdAt : {
                    gte: startOfMonth
                }
            },
            _sum : {
                amount : true
            }
        });
        if (
            monthlyTransactions._sum?.amount !== null &&
            budget !== undefined &&
            budget !== 0 &&
            monthlyTransactions._sum.amount > budget
          ) {
            return NextResponse.json({
                error: "Monthly transaction limit exceeded the budget. Either remove budget or exceed it's limit"
            }, { status: 403 });
        }

        if (transactionCount >= 5 && !user?.isSubscribed) {
            return NextResponse.json({
                error: "Cannot add more than six transactions per day in free model. Please buy premium plan for adding unlimited transactions."
            }, { status: 403 });
        }

        // Create the transaction
        const addTransactions = await prisma.transactions.create({
            data: {
                userId,
                amount,
                paymentMethod,
                paymentFor,
                category
            }
        });


        
        return NextResponse.json({
            transaction: addTransactions
        }, { status: 200 });

    } catch (error: any) {
        console.error("Internal server error in creating a transaction", error.message);
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}

export async function GET(req:NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({
            error: "Unauthorized user"
        }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    let page = parseInt(searchParams.get("page") || "1");
    if(page <= 0 || page >= 1000){
        page = 1;
    }
    const search = searchParams.get("search") || "";
    const ITEMS_PER_PAGE = 10;
    try {
        const transactions = await prisma.transactions.findMany({
            where : {
                userId,
                paymentFor : {
                    contains: search,
                    // comparison with case insesitive
                    mode: "insensitive",
                },
            }, 
            orderBy: { createdAt: "desc" },
            take: ITEMS_PER_PAGE,
            skip: (page - 1) * ITEMS_PER_PAGE,
        })
        const totalItems = await prisma.transactions.count({
            where : {
                userId,
                paymentFor: {
                    contains: search,
                    mode: "insensitive",
                },
            }
        })
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        return NextResponse.json({
            transactions,
            currentPage : page,
            totalPages
        })
    } catch (error : any) {
        console.error("Internal server error in fetching transactions", error.message)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
          );
    }
}