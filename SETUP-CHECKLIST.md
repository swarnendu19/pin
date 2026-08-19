# Setup Checklist — College Move-In Money Saver Kit

Complete these steps before going live. Items marked 🔴 are REQUIRED.

---

## 1. Dodo Payments Account

- [ ] 🔴 Create Dodo Payments account at https://app.dodopayments.com
- [ ] 🔴 Complete merchant verification (business/identity verification)
- [ ] 🔴 Add payout bank account
- [ ] 🔴 Create digital product in Dodo dashboard ($17 USD, one-time)
- [ ] 🔴 Upload product files (College-Move-In-Money-Saver-Kit-2026-27.zip, START-HERE.pdf)
- [ ] 🔴 Configure digital product delivery in Dodo
- [ ] 🔴 Copy Product ID → `NEXT_PUBLIC_DODO_PRODUCT_ID` in `.env.local`
- [ ] 🔴 Copy Test API key → `DODO_API_KEY` in `.env.local` (for testing)
- [ ] 🔴 Configure webhook URL: `https://YOURDOMAIN.com/api/webhooks/dodo`
- [ ] 🔴 Copy Webhook Secret → `DODO_WEBHOOK_SECRET` in `.env.local`
- [ ] 🔴 Configure success/return URL: `https://YOURDOMAIN.com/success`

See [DODO-SETUP.md](./DODO-SETUP.md) for detailed steps.

---

## 2. Analytics

- [ ] 🔴 Create Google Analytics 4 property at https://analytics.google.com
- [ ] 🔴 Copy Measurement ID (G-XXXXXXXXXX) → `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- [ ] 🔴 Create Pinterest Business account at https://ads.pinterest.com
- [ ] 🔴 Create Pinterest Tag → copy Tag ID → `NEXT_PUBLIC_PINTEREST_TAG_ID`
- [ ] Verify domain in Pinterest (follow Pinterest domain verification steps)
- [ ] (Optional) Create Meta Pixel → copy ID → `NEXT_PUBLIC_META_PIXEL_ID`, set `NEXT_PUBLIC_META_PIXEL_ENABLED=true`

---

## 3. Domain & Hosting

- [ ] 🔴 Register domain (e.g., moveinkit.com, dormready.com)
- [ ] 🔴 Create Vercel account at https://vercel.com
- [ ] 🔴 Connect GitHub repository to Vercel
- [ ] 🔴 Set `NEXT_PUBLIC_APP_URL` to your actual domain (https://YOURDOMAIN.com)
- [ ] 🔴 Add all environment variables to Vercel dashboard
- [ ] 🔴 Connect custom domain in Vercel
- [ ] Verify SSL certificate is active

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps.

---

## 4. Legal (REQUIRED — consult your attorney)

- [ ] 🔴 Replace `[BUSINESS LEGAL NAME]` → your actual business name in `.env.local`: `NEXT_PUBLIC_BUSINESS_LEGAL_NAME=Your LLC Name`
- [ ] 🔴 Replace `[SUPPORT EMAIL]` → your actual email: `NEXT_PUBLIC_SUPPORT_EMAIL=support@yourdomain.com`
- [ ] 🔴 Replace `[BUSINESS ADDRESS IF REQUIRED]` if legally required in your jurisdiction
- [ ] 🔴 Review Privacy Policy in `src/content/legal.ts` with legal counsel
- [ ] 🔴 Review Terms of Service with legal counsel
- [ ] 🔴 Review and finalize Refund Policy (edit in `src/content/legal.ts`)
- [ ] Confirm compliance with FTC digital product disclosure requirements
- [ ] Confirm compliance with your state's sales tax requirements for digital goods

---

## 5. Product Files

- [ ] 🔴 Finalize College-Move-In-Money-Saver-Kit-2026-27.zip
- [ ] 🔴 Finalize START-HERE.pdf guide
- [ ] 🔴 Upload files to Dodo Payments digital product delivery
- [ ] Test that download link works after test purchase

---

## 6. Test Purchase (before going live)

- [ ] 🔴 Run test purchase in Dodo TEST MODE (see DODO-TESTING.md)
- [ ] 🔴 Confirm checkout flow works on mobile (iPhone Safari)
- [ ] 🔴 Confirm success page loads after payment
- [ ] 🔴 Confirm GA4 purchase event fires (check GA4 DebugView)
- [ ] 🔴 Confirm customer receives product delivery email
- [ ] 🔴 Confirm webhook fires and is verified (check Dodo dashboard logs)

---

## 7. Switch to Live

- [ ] 🔴 Switch `DODO_MODE=live` in production environment variables
- [ ] 🔴 Replace test API key with live API key in Vercel
- [ ] 🔴 Update webhook URL in Dodo dashboard to production URL
- [ ] 🔴 Run one real $17 purchase to verify full flow
- [ ] 🔴 Confirm payout schedule in Dodo dashboard

---

## 8. Pinterest Ads (when ready to start advertising)

See [PINTEREST-ADS-SETUP.md](./PINTEREST-ADS-SETUP.md) for full guide.

- [ ] Complete Pinterest Business profile
- [ ] Create ad account
- [ ] Upload product images (1000×1500, 1000×1000)
- [ ] Set up conversion campaign
- [ ] Verify tracking before spending meaningful budget

---

## Notes

> **Legal disclaimer:** This checklist is not legal advice. Consult a qualified attorney for compliance with applicable laws including but not limited to consumer protection, digital product regulations, privacy law, and tax requirements in your jurisdiction.
