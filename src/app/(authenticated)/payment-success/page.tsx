"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PaymentSuccessContent = () => {
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount");

    return (
        <main className="w-11/12 mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
                <h2 className="text-2xl">It was a test to know our real customers. The service is free for you and no money has been deducted from your account</h2>
                <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
                    ${amount}
                </div>
            </div>
        </main>
    );
};

const PaymentSuccessPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <PaymentSuccessContent />
    </Suspense>
);

export default PaymentSuccessPage;
