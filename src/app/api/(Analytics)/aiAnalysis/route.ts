import { gemini } from "@/lib/gemini";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const firstPrompt = "Context: The data will be from Transaction management app where users can manage their transaction records, categorize them and see analysis. There are limited categories offered to users to categorize their payment. Those categories are enum PaymentMethod { CARD // Payment by credit or debit card CASH // Cash transactions NETBANKING // Online banking transfers} enum TransactionCategory {GROCERIES ENTERTAINMENT TRANSPORT UTILITIES OTHERS }. This was done to make analysis easy. The user can analyse their data through charts and heat maps. This is what they are offered in their profile section. \n 1. Total amount recorded in this app. \n Maximum amount spent on which category.\n Which payment method was used to spend maximum amount. \n Category wise expenses through doughnut chart. \n How much amount is spent by which payment method through radar chart. \n Last week amount record through bar chart. \n Last 365 days spending amount record through Heat maps\n. The another method for analysis is by using genAI for which I am using this gemini API"

const secondPrompt = "So I am attatching the database transaction history with this response and you have analyse it. I will tell you at the end what you have to analyse.Most probably it will be response from user so you have to act accordingly. If you feel they ask something that violates the use of this app or may be inappropriate like abusive language, don't response at all. Also I will add previous responses that were given to user by you (if any) so you have to analyze results accordingly. \n Keep in mind these points.\n You are directly communicating with user, therefore response like you are talking to them. For example, Hi, Based on this data you can improve your spending analysis this way...... \n category others means user category was not present in our enums therefore don't ask him to specify category, Others simply means his category was not available. \n Context is limited as user has his data in our app since he started using it therefore don't ask for more context.\n Keep these responses precise, 100-200 words at max so that consecutive request window size won't exceed much. NOTE: USE HTML TAGS RATHER THAN MARKDOWN TAGS FOR FORMATTING. DON'T ADD BREAK LINES CHARACTERS AND DONT USE MORE THAN ONE NEWLINE CHARACTER CONSECUTIVELY";

export async function POST (req : NextRequest) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({
            success : false,
            error : "Unauthorised request"
        }, { status : 401 });
    }
    try {
        const {prompt : userResponse} = await req.json();
        
        const transactions = await prisma.transactions.findMany({
            where: {
            userId
            },
            orderBy: {
            createdAt: 'desc'
            },
            select: {
                paymentFor: true,
                paymentMethod: true,
                amount: true,
                category: true,
                createdAt: true,
                updatedAt: true
            },
            take: 500
        });
        const stringifyTransaction = JSON.stringify(transactions);

        const finalResponse = firstPrompt + secondPrompt + stringifyTransaction + "User response ahead::::: " + userResponse;

        console.log(finalResponse);

        const response = await gemini(finalResponse);
        return NextResponse.json({
            response 
        }, {status : 200});
    } catch (error) {
        return NextResponse.json({
            error : "Internal server error"
        }, {status : 500});
    }

}