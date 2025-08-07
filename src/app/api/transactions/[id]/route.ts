import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { TransactionCategory, PaymentMethod } from "@prisma/client";

export async function PATCH(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({
            error : "Unauthorised user"
        }, {status : 401});
    }
    try {
        const {id} = await params;
        const transactionId = id;
        const transaction = await prisma.transactions.findUnique({
            where : {
                id : transactionId
            }
        })
        if(!transaction){
            return NextResponse.json({
                error : "No transaction found with this transaction id"
            }, {status : 404})
        }
        const {paymentMethod, paymentFor, amount, category} = await req.json();
        if(!paymentFor || !paymentMethod || !amount || !category){
            return NextResponse.json({
                error : "Incomplete field"
            }, {status : 400});
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
        const updateTransaction = await prisma.transactions.update({
            where : {
                id : transactionId
            },
            data : {
                paymentMethod,
                paymentFor,
                amount,
                category
            }
        })
        if(!updateTransaction){
            return NextResponse.json({
                error : "Failed to update transaction"  
            }, {status : 400});
        }
    } catch (error : any) {
        console.error("Internal server error in update transactions", error.message);
        return NextResponse.json({
            error : error.message
        }, {status : 500});
    }
}