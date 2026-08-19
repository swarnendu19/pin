/**
 * Central product configuration.
 * All product data lives here — never scatter hardcoded values across components.
 */

export const PRODUCT = {
  productName: "College Move-In Money Saver Kit 2026–27",
  shortName: "Move-In Kit",
  tagline: "Pack smarter. Spend smarter. Move in organized.",
  description:
    "A complete dorm move-in system with packing lists, budget calculator, roommate planner, shopping trackers and move-in checklists — everything incoming college students need.",

  /** Pricing */
  price: 17,
  currency: "USD" as const,
  priceDisplay: "$17",

  /** Dodo Payments — set via environment variables */
  dodoProductId: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID ?? "",
  dodoApiKey: process.env.DODO_API_KEY ?? "",           // server-side only
  dodoWebhookSecret: process.env.DODO_WEBHOOK_SECRET ?? "", // server-side only
  dodoMode: (process.env.DODO_MODE ?? "test") as "test" | "live",

  /** App URL — used for success/cancel redirect URLs */
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  /** Support */
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@[YOURDOMAIN].com",

  /** Analytics */
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "",
  pinterestTagId: process.env.NEXT_PUBLIC_PINTEREST_TAG_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "", // disabled by default

  /** Feature flags */
  checkoutEnabled: process.env.NEXT_PUBLIC_CHECKOUT_ENABLED !== "false",
  metaPixelEnabled: process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true",
  analyticsDebug: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true",

  /** A/B test variants (set via environment for manual testing) */
  heroVariant: (process.env.NEXT_PUBLIC_HERO_VARIANT ?? "A") as "A" | "B",
  ctaVariant: (process.env.NEXT_PUBLIC_CTA_VARIANT ?? "A") as "A" | "B",
  pricingVariant: (process.env.NEXT_PUBLIC_PRICING_VARIANT ?? "A") as "A" | "B",

  /** Legal content placeholders — fill in SETUP-CHECKLIST.md */
  businessLegalName: process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME ?? "[BUSINESS LEGAL NAME]",
  businessAddress: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "[BUSINESS ADDRESS]",
  businessCountry: process.env.NEXT_PUBLIC_BUSINESS_COUNTRY ?? "United States",

  /** Future upsell product (not active in V1) */
  upsell: {
    enabled: false,
    productName: "Freshman First 30 Days Survival Pack",
    price: 7,
    currency: "USD" as const,
    dodoProductId: "", // placeholder for future
  },
} as const;

export type ProductConfig = typeof PRODUCT;
