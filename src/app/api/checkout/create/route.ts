import { NextResponse } from "next/server";
import { PRODUCT } from "@/config/product";
import Dodopayments from "dodopayments";

// Simple in-memory rate limiting (Note: not suitable for serverless edge without Redis, but okay for MVP)
const rateLimit = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (record && now - record.timestamp < 60000) {
    if (record.count >= 10) return false;
    record.count++;
  } else {
    rateLimit.set(ip, { count: 1, timestamp: now });
  }
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { productId, successUrl, cancelUrl, metadata } = body;

    if (!productId || !successUrl || !cancelUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = new Dodopayments({ bearerToken: process.env.DODO_API_KEY });
    
    // Create checkout session using SDK
    const payment = await client.payments.create({
      billing: {
        city: "",
        country: "US",
        state: "",
        street: "",
        zipcode: ""
      },
      customer: {
        email: "",
        name: ""
      },
      product_cart: [{
        product_id: productId,
        quantity: 1
      }],
      return_url: successUrl,
    });
    
    // We expect the payment object to contain a checkout_url or similar property
    // Adapting based on typical SDK behavior (Dodo uses payment_link or checkout_url)
    const checkoutUrl = (payment as any).checkout_url || (payment as any).payment_link;

    if (!checkoutUrl) {
      throw new Error("No checkout URL returned from Dodo API");
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("[Checkout Create Error]:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
