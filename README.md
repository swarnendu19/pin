# College Move-In Money Saver Kit — Landing Page & Sales Funnel

A production-ready Next.js sales funnel for the **College Move-In Money Saver Kit 2026–27** — a $17 digital product for incoming U.S. college students and their parents.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| UI Primitives | shadcn/ui (configured) |
| Payments | Dodo Payments |
| Analytics | GA4 + Pinterest Tag |
| Deployment | Vercel |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Fill in your credentials (see SETUP-CHECKLIST.md)

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|----------|-------------|
| `DODO_API_KEY` | Dodo API key (server-side only) |
| `DODO_WEBHOOK_SECRET` | Webhook verification secret |
| `DODO_MODE` | `test` or `live` |
| `NEXT_PUBLIC_DODO_PRODUCT_ID` | Your Dodo product ID |
| `NEXT_PUBLIC_APP_URL` | Your app URL |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | GA4 ID |
| `NEXT_PUBLIC_PINTEREST_TAG_ID` | Pinterest Tag ID |

See `.env.example` for all variables.

---

## Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server (after build)
npm run lint         # ESLint
npm run typecheck    # TypeScript check (tsc --noEmit)
```

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout + analytics scripts
│   ├── page.tsx            # Landing page (/)
│   ├── success/page.tsx    # Thank-you page (/success)
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── refund-policy/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts          # Dynamic sitemap
│   └── api/
│       ├── checkout/create/route.ts   # Create Dodo checkout session
│       ├── checkout/verify/route.ts   # Verify payment server-side
│       └── webhooks/dodo/route.ts     # Dodo webhook handler
├── components/
│   ├── landing/            # All landing page sections
│   ├── checkout/
│   │   └── PurchaseButton.tsx  # Centralized checkout button
│   └── analytics/
├── config/
│   └── product.ts          # Single source of truth for product data
├── content/
│   ├── landing.ts          # All landing page copy
│   ├── faq.ts              # FAQ content
│   └── legal.ts            # Legal page templates
├── data/
│   └── testimonials.ts     # Customer testimonials (empty until launch)
├── lib/
│   ├── analytics.ts        # Unified GA4 + Pinterest analytics
│   ├── dodo.ts             # Dodo Payments wrapper
│   ├── utm.ts              # UTM capture and storage
│   └── utils.ts            # Tailwind utility
└── hooks/
```

---

## Payment Architecture

See [PAYMENT-ARCHITECTURE.md](./PAYMENT-ARCHITECTURE.md) for full details.

**Summary:** Dodo Payments hosted checkout (redirect). Our server creates a checkout session via API, client is redirected to Dodo's checkout page, Dodo redirects back to `/success` with payment ID, we verify server-side before firing analytics.

---

## Analytics

- **GA4**: `view_item`, `begin_checkout`, `purchase` (with value $17 and transaction ID)
- **Pinterest**: `pagevisit`, `checkout` events
- **Purchase tracking**: Only fires after server-side verification — never on URL visit alone

---

## Key Design Decisions

1. **No account required** — zero friction, Dodo handles delivery
2. **No database** — webhook idempotency uses in-memory Map (fine for this scale)
3. **Content separated from components** — all copy in `src/content/` for easy A/B testing
4. **Single PurchaseButton** — all checkout flows through one component
5. **Feature flags via env vars** — hero variant, CTA variant, checkout enabled

---

## Documentation

| File | Contents |
|------|----------|
| [SETUP-CHECKLIST.md](./SETUP-CHECKLIST.md) | Everything to do before going live |
| [DODO-SETUP.md](./DODO-SETUP.md) | Dodo dashboard step-by-step |
| [DODO-TESTING.md](./DODO-TESTING.md) | Test checkout workflow |
| [PAYMENT-ARCHITECTURE.md](./PAYMENT-ARCHITECTURE.md) | Payment design decisions |
| [PINTEREST-TRACKING.md](./PINTEREST-TRACKING.md) | Pinterest Tag setup |
| [PINTEREST-ADS-SETUP.md](./PINTEREST-ADS-SETUP.md) | Pinterest Ads guide |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Vercel deployment |
| [SECURITY.md](./SECURITY.md) | Security review |
| [FUTURE-UPSELL-NOTES.md](./FUTURE-UPSELL-NOTES.md) | Upsell architecture notes |
| [QA-REPORT.md](./QA-REPORT.md) | QA results |
