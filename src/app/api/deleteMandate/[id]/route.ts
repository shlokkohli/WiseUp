import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req : NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({
            success : "False",
            error : "Unauthorised Request"
        })
    }
    try {
        const id = (await params).id;
        const mandate = await prisma.mandates.delete({
            where : {
                id
            }
        });
        if(mandate){
            return NextResponse.json({
                mandate
            })
        }
    } catch (error : any) {
        console.log("Error while deleting mandate", error.message);
        return NextResponse.json({
            success : false,
            error : "Internal server error"
        })
    }

}