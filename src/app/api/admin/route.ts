
import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";



const ITEMS_PER_PAGE = 10;

async function isAdmin(userId: string) {
  const user = await (await clerkClient()).users.getUser(userId);
  return user.publicMetadata.role === "admin";
}

export async function GET(req:NextRequest) {
    const {userId} = await auth();

    if (!userId || !(await isAdmin(userId))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    let page = parseInt(searchParams.get("page") || "1");
    if(page < 1 || page >= 1000){
      page = 1;
    }
    try {
      let user;
      if(email){
        user = await prisma.user.findUnique({
          where : {email},
          include : {
            Transactions : {
              orderBy: { createdAt: "desc" },
              take: ITEMS_PER_PAGE,
              skip: (page - 1) * ITEMS_PER_PAGE,
            },
            SubscriptionsBought : {
              orderBy : {createdAt : "desc"}
            }
          }
        })
      }
      const totalItems = email
      ? await prisma.transactions.count({ where: { user: { email } } })
      : 0;
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      return NextResponse.json({ user, totalPages, currentPage: page }, {status : 200});
    } catch (error : any) {
      console.error("Internal server error in fetching users", error.message);
      return NextResponse.json({
        error : error.message
      }, {status : 500});
    }
}

export async function PUT(req:NextRequest) {
  // update user subscription if in case payment deducted but subscription failed
  const { userId } = await auth();

  if (!userId || !(await isAdmin(userId))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const {clientId} = await req.json();
    if(!clientId){
      return NextResponse.json({
        error : "Please provide client Id"
      }, {status : 400})
    }
      const client = await prisma.user.findUnique
      (
        {
          where : {
            id : clientId
          }
        });
        if(!client){
          return NextResponse.json({
            error : "Invalid Client Id or Client not found"
          }, {status :  404})
        }
        const updatedUser = await prisma.user.update({
          where : {
            id : clientId
          },
          data : {
            isSubscribed : true,
            subscriptionEnds : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        })
        return NextResponse.json({
          updatedUser
        }, {status : 200});  
  } catch (error: any) {
    console.error("Internal server error ", error.message);
    return NextResponse.json({
      error : error.message
    }, {status : 500})
  }  
}

export async function DELETE(req : NextRequest) {
  const { userId } = await auth();

  if (!userId || !(await isAdmin(userId))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const {clientId} = await req.json();
    if(!clientId){
      return NextResponse.json({
        error : "Please provide Client Id"
      }, {status : 400});
    }
    const client = await prisma.user.findUnique({
      where : {id : clientId}
    })
    if(!client){
      return NextResponse.json({
        error : "No client found with this client ID"
      }, {status : 404});
    }
    const deletedUser = await prisma.user.delete({
      where : {
        id : clientId
      }
    });
    
    const deleteUserFromClerk = await (await clerkClient()).users.deleteUser(clientId);
    if(deleteUserFromClerk && deletedUser){
      return NextResponse.json({
        deletedUser
      }, {status : 200});
    }
    
  } catch (error : any) {
    console.error("Internal server error in deleting user", error.message);
    return NextResponse.json({
      error : error.message
    }, { status : 500 })
  }
}
