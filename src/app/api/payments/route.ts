import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();

  const signature = req.headers.get("stripe-signature");

  let event;

  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    event = stripe.webhooks.constructEvent(payload, signature!, endPointSecret);

    switch (event.type) {
      case "checkout.session.completed":
        const sessionId = event.data.object.id;

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });

        await handleCheckoutSessionCompleted(session, stripe);
        break;
      case "customer.subscription.deleted":
        const subscriptionId = event.data.object.id;

        await handleSubscriptionDeleted(subscriptionId, stripe);
        break;
      default:
        console.log("unhandled event type", event.type);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to trigger webhook.",
        error,
      },
      { status: 400 }
    );
  }
  return NextResponse.json({
    success: true,
    message: "Payment done.",
  });
};
