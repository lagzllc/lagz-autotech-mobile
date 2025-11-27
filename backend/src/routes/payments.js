import express from "express";
import Stripe from "stripe";
import paypal from "@paypal/checkout-server-sdk";

const router = express.Router();

// Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET);

// PayPal environment
const env = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT,
  process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(env);

// Stripe payment request
router.post("/stripe", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd"
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ msg: "Stripe payment error" });
  }
});

// PayPal payment request
router.post("/paypal", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = new paypal.orders.OrdersCreateRequest();
    order.prefer("return=representation");
    order.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount
          },
          description: "Lagz AutoTech Mobile Service Payment"
        }
      ]
    });

    const response = await client.execute(order);
    res.json(response.result);
  } catch (err) {
    console.error("PayPal error:", err);
    res.status(500).json({ msg: "PayPal payment error" });
  }
});

export default router;
