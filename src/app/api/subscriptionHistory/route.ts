import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({
            error : "User not authorised"
        }, {status : 400});
    }
    try {
        const previousSubscriptions = await prisma.subscription.findMany({
            where : {
                userId : userId
            }
        });
    
        return NextResponse.json({
            subscriptions : previousSubscriptions
        }, {status : 200})
    } catch (error : any) {
        console.error("Internal server error in fetching previous subscriptions", error.message);
        return NextResponse.json({
            error : error.message
        }, {status : 500});
    }
}