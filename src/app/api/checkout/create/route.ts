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
    const { productId, bumpProductId, successUrl, cancelUrl, metadata } = body;

    if (!productId || !successUrl || !cancelUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = new Dodopayments({ bearerToken: process.env.DODO_API_KEY });
    
    const product_cart = [
      { product_id: productId, quantity: 1 }
    ];

    if (bumpProductId) {
      product_cart.push({ product_id: bumpProductId, quantity: 1 });
    }

    // Create checkout session using SDK
    const session = await client.checkoutSessions.create({
      product_cart,
      return_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata || {}
    });
    
    const checkoutUrl = session.checkout_url;

    if (!checkoutUrl) {
      throw new Error("No checkout URL returned from Dodo API");
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("[Checkout Create Error]:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
