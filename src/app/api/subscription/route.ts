import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req : NextRequest) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({
            error : "Unauthorized user"
        }, {status : 401});
    }
    try {
        const {amount, paymentIntent} = await req.json();
        const user = await prisma.user.findUnique({
            where : {
                id : userId
            }
        })
        if(!user){
            return NextResponse.json({
                error : "No user found"
            }, {status : 404});
        }

        // payment method here
        const addSubscription = await prisma.subscription.create({data : {
            id : paymentIntent.toString(),
            userId,
            subscriptionAmount : amount

        }})

        // fix it later (Bug : We can not deduct money without giving subscription, we need to ensure 99.99 percent sucess rate);
        if(!addSubscription){
            return NextResponse.json({
                error : "Failed to add subscription"
            }, {status : 400});
        }

        const subscriptionEnds = new Date();
        subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);

        const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            isSubscribed: true,
            subscriptionEnds: subscriptionEnds,
        },
        });
        if(updatedUser){
            return NextResponse.json({
                message: "Subscription successful",
                subscriptionEnds: updatedUser.subscriptionEnds,
              }, {status : 200});
        }
        return NextResponse.json({
            error: "Subscription update failed",
        }, { status: 400 });
    } catch (error : any) {
        console.error("Internal server error in subscribing user", error.message);
        return NextResponse.json({
            error : error.message
        }, {status : 500});
    }
}

export async function GET(req:NextRequest) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({
            error : "Unauthorised user"
        }, {status : 401});
    }
    try {
        const user = await prisma.user.findUnique({
            where : {
                id : userId
            },
            select : {
                isSubscribed : true,
                subscriptionEnds : true
            }
        });
        if(!user){
            return NextResponse.json({
                error : "User not found"
            }, {status : 404});
        }
        const now = new Date();
        if(user.subscriptionEnds && user.subscriptionEnds < now){
            await prisma.user.update({
                where : {
                    id : userId,
                },
                data : {
                    isSubscribed : false,
                    subscriptionEnds : null
                }
            });
            return NextResponse.json({ isSubscribed: false, subscriptionEnds: null });
        }
        return NextResponse.json({
            isSubscribed: user.isSubscribed,
            subscriptionEnds: user.subscriptionEnds,
          });
    } catch (error : any) {
        console.error("Internal server error in updating user subscription get", error.message);
        return NextResponse.json({
            error : error.message
        }, {status : 500});
    }
}