
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export default stripe;