# Dodo Payments Testing Guide

How to test the complete payment flow before going live.

---

## Prerequisites

- [ ] Dodo account created
- [ ] Product created in Dodo dashboard
- [ ] Test API key copied to `.env.local`
- [ ] `DODO_MODE=test` in `.env.local`
- [ ] Product ID added to `.env.local`
- [ ] App running locally (`npm run dev`)

---

## Step 1: Set Up Local Webhook Testing

Dodo needs to reach your local machine to send webhooks. Use **ngrok** (free):

```bash
# Install ngrok if not already installed
# https://ngrok.com/download

# Start ngrok tunnel (in a separate terminal)
ngrok http 3000
```

You'll get a URL like `https://abc123.ngrok.io`. Use this as your base URL for webhook configuration.

In Dodo dashboard, add webhook endpoint: `https://abc123.ngrok.io/api/webhooks/dodo`

---

## Step 2: Configure Test Environment

Your `.env.local` should have:
```env
DODO_API_KEY=test_...              # Your Dodo TEST API key
DODO_WEBHOOK_SECRET=whsec_...      # Your webhook signing secret
DODO_MODE=test
NEXT_PUBLIC_DODO_PRODUCT_ID=prod_... # Your product ID
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CHECKOUT_ENABLED=true
NEXT_PUBLIC_ANALYTICS_DEBUG=true   # Helpful to see analytics events in console
```

---

## Step 3: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 4: Initiate Test Checkout

1. Open the landing page
2. Click **"Get The Complete Kit — $17"** (any CTA button)
3. Observe in browser console: `[Analytics] begin_checkout` should fire
4. You should be redirected to Dodo's test checkout page

---

## Step 5: Complete Test Payment

On Dodo's test checkout page:

Use Dodo's test card details (check current Dodo test card documentation at https://docs.dodopayments.com):
- Test card numbers are provided by Dodo in their developer documentation
- Common test cards use: `4242 4242 4242 4242` (Stripe-style) or Dodo's equivalent
- Use any future expiry date and any 3-digit CVV
- Use any name and any ZIP code

Complete the test payment.

---

## Step 6: Check the Success Page

After payment:
1. You should be redirected to `http://localhost:3000/success?payment_id=...`
2. The success page should show "You're Move-In Ready. 🎓"
3. Check browser console: `[Analytics] purchase` should fire with the transaction ID
4. The purchase event should NOT fire if you navigate to `/success` without a payment_id

---

## Step 7: Inspect Webhook

In your terminal running the app:
1. Check for webhook receipt: look for `[Webhook]` log messages
2. You should see: event type, event ID, timestamp logged
3. You should NOT see: card numbers, full customer email, sensitive payment data

In ngrok web interface (`http://localhost:4040`):
1. You can see all incoming webhook requests
2. Verify the request came from Dodo's IP range
3. Inspect the request body (without seeing it in production logs)

---

## Step 8: Confirm Purchase Event

If you have `NEXT_PUBLIC_ANALYTICS_DEBUG=true` and GA4/Pinterest IDs configured:
1. Open browser console
2. Look for `[Analytics] purchase { transactionId: "...", value: 17 }`
3. Verify it contains `currency: "USD"` and `value: 17`

Alternatively: check GA4 DebugView (if GA4 is configured) at:
https://analytics.google.com → Admin → DebugView

---

## Step 9: Confirm Customer Delivery

After a test purchase:
1. Check the email address used at checkout
2. Dodo should send a delivery email with product access
3. Verify the download link works
4. Verify the correct files are delivered

---

## Step 10: Switch to Production

When all tests pass:

1. In Dodo dashboard, get your **Live API key**
2. In Vercel dashboard, update these environment variables:
   ```
   DODO_API_KEY=live_...   ← your live key
   DODO_MODE=live
   NEXT_PUBLIC_APP_URL=https://YOURDOMAIN.com
   ```
3. Update webhook endpoint in Dodo dashboard to production URL:
   `https://YOURDOMAIN.com/api/webhooks/dodo`
4. Deploy to Vercel
5. Run one real $17 purchase to verify live flow
6. Verify payout appears in Dodo dashboard

---

## Troubleshooting

### Checkout not starting
- Check `NEXT_PUBLIC_CHECKOUT_ENABLED=true`
- Check `NEXT_PUBLIC_DODO_PRODUCT_ID` is set
- Check browser console for errors
- Check `DODO_API_KEY` is the test key (not blank)

### Webhook not receiving
- Is ngrok running? (`ngrok http 3000`)
- Is webhook URL in Dodo dashboard pointing to ngrok URL?
- Check Dodo dashboard for webhook delivery logs

### Success page not showing purchase event
- Is `payment_id` in the URL query string?
- Check `/api/checkout/verify` is returning `verified: true`
- Check browser console for `[Analytics] purchase`

### Payment not verified
- Ensure Dodo test payment actually succeeded (check Dodo dashboard → Payments)
- Check server logs for verify API errors
