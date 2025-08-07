import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req : NextRequest) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({
            error : "Unauthorised request"
        }, {status : 401});
    }
    try {
        const mandates = await prisma.mandates.findMany({
            where : {
                userId
            }
        })

        return NextResponse.json({
            mandates
        })
    } catch (error : any) {
        console.log("Internal server error in fetching mandates",error.message);
        return NextResponse.json({
            success : false,
            error : "Internal server error"
        } ,{ status : 500});
        
    }
}