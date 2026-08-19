import { NextResponse } from "next/server";
import crypto from "crypto";

const processedEvents = new Map<string, number>();

function verifySignature(payload: string, signature: string, secret: string) {
  // Typical Dodo/Stripe signature verification
  // Depending on exact Dodo signature structure, this might need adjusting.
  // Using a generic HMAC SHA256 for now.
  try {
    const [tsPart, sigPart] = signature.split(',');
    if (!tsPart || !sigPart) return false;
    
    const timestamp = tsPart.split('=')[1];
    const sig = sigPart.split('=')[1];
    
    const signedPayload = `${timestamp}.${payload}`;
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');
      
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig));
  } catch (e) {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("dodo-signature");
    const secret = process.env.DODO_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return NextResponse.json({ error: "Missing signature or secret" }, { status: 401 });
    }

    // Attempt to verify signature
    // If the Dodo SDK has a built-in constructEvent, we would use it here.
    // For now, implementing manual check or bypass if in test/development without strict secret.
    const isValid = verifySignature(rawBody, signature, secret) || process.env.NODE_ENV === "development";
    
    if (!isValid && process.env.NODE_ENV !== "development") {
       return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Idempotency check
    if (event.event_id) {
      const now = Date.now();
      if (processedEvents.has(event.event_id)) {
        return NextResponse.json({ received: true, note: "Already processed" });
      }
      processedEvents.set(event.event_id, now);
      
      // Cleanup old events (keep for 24h)
      for (const [id, time] of processedEvents.entries()) {
        if (now - time > 86400000) processedEvents.delete(id);
      }
    }

    // Handle events securely without logging PII
    if (event.type === 'payment.succeeded') {
      console.log(`[Webhook] Payment succeeded! Event ID: ${event.event_id || 'unknown'}`);
      // Add fulfillment logic or database insert here if needed
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Webhook Error]:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
