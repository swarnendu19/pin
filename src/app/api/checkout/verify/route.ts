import { NextResponse } from "next/server";
import Dodopayments from "dodopayments";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const payment_id = searchParams.get("payment_id");

    if (!payment_id) {
      return NextResponse.json({ verified: false }, { status: 400 });
    }

    const client = new Dodopayments({ bearerToken: process.env.DODO_API_KEY });
    
    // Fetch payment status
    const payment = await client.payments.retrieve(payment_id);
    
    const isSuccess = payment.status === "succeeded";
    
    return NextResponse.json({
      verified: isSuccess,
      transactionId: isSuccess ? payment.payment_id : undefined
    });
  } catch (error) {
    console.error("[Checkout Verify Error]:", error);
    return NextResponse.json({ verified: false }, { status: 500 });
  }
}
