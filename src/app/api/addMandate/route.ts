import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:  NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({
            error: "Unauthorized user"
        }, { status: 401 });
    }
    try {
        const {paymentMethod, paymentFor, amount, startDate, repeat} = await req.json();
        const dateObj = new Date(startDate)

        const setMandate = await prisma.mandates.create({
            data : {
                userId,
                paymentFor,
                paymentMethod,
                amount,
                repeat,
                startDate: dateObj
            }
        });

        if(setMandate) {
            return NextResponse.json({
                success : true,
                mandate : setMandate
            }, { status: 200 });
        }
    } catch (error : any) {
        console.error("Internal server error in creating a transaction", error.message);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 });
        
    }


}