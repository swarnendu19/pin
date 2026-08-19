/**
 * Unified analytics abstraction.
 * All analytics calls go through here — GA4 and Pinterest receive the same events.
 *
 * IMPORTANT: Never fire 'purchase' events based solely on URL.
 * Purchase events must only fire after server-side verification.
 */

import { PRODUCT } from "@/config/product";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    pintrk?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

function debug(event: string, params?: Record<string, unknown>) {
  if (PRODUCT.analyticsDebug && isClient()) {
    console.log(`[Analytics] ${event}`, params ?? "");
  }
}

// ─── GA4 ──────────────────────────────────────────────────────────────────────

function ga4(eventName: string, params?: Record<string, unknown>) {
  if (!isClient() || !PRODUCT.ga4MeasurementId) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

// ─── Pinterest ─────────────────────────────────────────────────────────────────

function pinterest(eventName: string, params?: Record<string, unknown>) {
  if (!isClient() || !PRODUCT.pinterestTagId) return;
  if (typeof window.pintrk !== "function") return;
  window.pintrk("track", eventName, params);
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const analytics = {
  /** Page view — fired by layout automatically */
  pageView(url: string) {
    debug("page_view", { url });
    ga4("page_view", { page_location: url });
    pinterest("pagevisit");
  },

  /** User scrolled to a scroll depth milestone */
  scrollDepth(percent: 25 | 50 | 75 | 90) {
    debug(`scroll_${percent}`);
    ga4(`scroll_${percent}`, { percent_scrolled: percent });
  },

  /** User viewed the product (e.g., above-fold impression) */
  viewProduct() {
    debug("view_item");
    ga4("view_item", {
      currency: PRODUCT.currency,
      value: PRODUCT.price,
      items: [
        {
          item_id: PRODUCT.dodoProductId,
          item_name: PRODUCT.productName,
          price: PRODUCT.price,
          currency: PRODUCT.currency,
        },
      ],
    });
    pinterest("viewcategory", {
      product_name: PRODUCT.productName,
      value: PRODUCT.price,
      currency: PRODUCT.currency,
    });
  },

  /** User clicked a CTA */
  ctaClick(location: "hero" | "product" | "parent" | "final" | "sticky") {
    debug("cta_click", { location });
    ga4("cta_click", { cta_location: location });
  },

  /** Checkout was initiated — only fires when Dodo checkout actually starts */
  checkoutStarted() {
    debug("begin_checkout");
    ga4("begin_checkout", {
      currency: PRODUCT.currency,
      value: PRODUCT.price,
      items: [
        {
          item_id: PRODUCT.dodoProductId,
          item_name: PRODUCT.productName,
          price: PRODUCT.price,
          currency: PRODUCT.currency,
        },
      ],
    });
    pinterest("checkout", {
      value: PRODUCT.price,
      order_quantity: 1,
      currency: PRODUCT.currency,
    });
  },

  /**
   * Purchase completed.
   *
   * CRITICAL: Only call this after server-side verification of payment status.
   * Never call this simply because the user landed on /success.
   *
   * @param transactionId - Dodo payment/order ID
   */
  purchase(transactionId: string) {
    debug("purchase", { transactionId, value: PRODUCT.price });
    ga4("purchase", {
      transaction_id: transactionId,
      currency: PRODUCT.currency,
      value: PRODUCT.price,
      items: [
        {
          item_id: PRODUCT.dodoProductId,
          item_name: PRODUCT.productName,
          price: PRODUCT.price,
          currency: PRODUCT.currency,
          quantity: 1,
        },
      ],
    });
    pinterest("checkout", {
      value: PRODUCT.price,
      order_quantity: 1,
      currency: PRODUCT.currency,
      order_id: transactionId,
    });
  },

  /** Payment failed or was cancelled — only fires if payment state confirms it */
  paymentFailed() {
    debug("payment_failed");
    ga4("payment_failed", {
      currency: PRODUCT.currency,
      value: PRODUCT.price,
    });
  },
};
