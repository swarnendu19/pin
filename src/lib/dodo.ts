/**
 * Dodo Payments SDK wrapper.
 * All Dodo-specific logic lives here — never scatter it across components.
 *
 * Uses the official Dodo Payments JavaScript SDK / redirect checkout.
 * Documentation: https://docs.dodopayments.com
 */

import { PRODUCT } from "@/config/product";

export interface CheckoutOptions {
  /** Override redirect URLs (defaults to PRODUCT.appUrl + /success or /checkout/failed) */
  successUrl?: string;
  cancelUrl?: string;
  /** Optional metadata to pass through checkout — will appear on webhook */
  metadata?: Record<string, string>;
}

export interface CheckoutResult {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}

/**
 * Initiate a Dodo Payments checkout session.
 *
 * This creates a checkout session server-side via our API route
 * to keep the API key secure. The client is then redirected to
 * Dodo's hosted checkout page.
 */
export async function initiateCheckout(
  options: CheckoutOptions = {}
): Promise<CheckoutResult> {
  const successUrl = options.successUrl ?? `${PRODUCT.appUrl}/success`;
  const cancelUrl = options.cancelUrl ?? `${PRODUCT.appUrl}/?checkout=cancelled`;

  try {
    const response = await fetch("/api/checkout/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: PRODUCT.dodoProductId,
        successUrl,
        cancelUrl,
        metadata: options.metadata ?? {},
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: (errorData as { error?: string }).error ?? "Failed to start checkout. Please try again.",
      };
    }

    const data = (await response.json()) as { checkoutUrl?: string; error?: string };

    if (!data.checkoutUrl) {
      return { success: false, error: "Invalid checkout response." };
    }

    return { success: true, checkoutUrl: data.checkoutUrl };
  } catch (err) {
    console.error("[Dodo] Checkout initiation error:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

/**
 * Verify a payment status server-side.
 * Used on the /success page to confirm payment before firing purchase event.
 *
 * @param paymentId - Payment ID from Dodo redirect URL query params
 */
export async function verifyPayment(
  paymentId: string
): Promise<{ verified: boolean; transactionId?: string }> {
  if (!paymentId) return { verified: false };

  try {
    const response = await fetch(
      `/api/checkout/verify?payment_id=${encodeURIComponent(paymentId)}`
    );

    if (!response.ok) return { verified: false };

    const data = (await response.json()) as { verified?: boolean; transactionId?: string };
    return {
      verified: data.verified === true,
      transactionId: data.transactionId,
    };
  } catch {
    return { verified: false };
  }
}
