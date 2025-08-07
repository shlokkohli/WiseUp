'use client'
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("Stripe public key is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const page = () => {
  const amount = 1.00
  return (
    <main className="w-11/12 mx-auto overflow-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
    <div className="mb-10">
      <h1 className="text-4xl font-extrabold mb-2">WiseUp</h1>
      <h2 className="text-2xl">
        Monthly Subscription
        <span className="font-bold"> ${amount}</span>
      </h2>
    </div>
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(amount),
        currency: "usd",
      }}
    >
      <CheckoutPage amount={amount} />
    </Elements>
  </main>
  )
}

export default page
