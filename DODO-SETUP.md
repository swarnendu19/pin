# Dodo Payments Setup Guide

Step-by-step instructions for configuring Dodo Payments for the College Move-In Money Saver Kit.

---

## 1. Create Your Dodo Account

1. Go to [https://app.dodopayments.com](https://app.dodopayments.com)
2. Click **Sign Up**
3. Enter your email and create a password
4. Verify your email address

---

## 2. Complete Merchant Verification

Dodo requires identity and business verification before you can accept live payments.

1. From the dashboard, navigate to **Settings → Verification** (or the verification prompt shown on first login)
2. Complete the required KYC (Know Your Customer) steps:
   - Personal identification
   - Business information (if selling as a business entity)
3. Wait for verification approval (typically 1–3 business days)
4. You can set up your product and test in test mode while awaiting verification

---

## 3. Add Payout Method

1. Navigate to **Settings → Payouts**
2. Add your bank account or preferred payout method
3. Verify the payout method as instructed

---

## 4. Create Your Product

1. Navigate to **Products** in the Dodo dashboard
2. Click **Create Product** (or **+ New Product**)
3. Enter product details:
   - **Name:** College Move-In Money Saver Kit 2026–27
   - **Description:** Complete dorm move-in system with packing list, budget calculator, roommate planner and move-in checklists
   - **Type:** Digital Product / One-time purchase
4. Set pricing:
   - **Amount:** $17.00
   - **Currency:** USD
   - **Billing type:** One-time

---

## 5. Configure Digital Product Delivery

1. On your product page, find the **Digital Delivery** or **Files** section
2. Upload your product files:
   - `College-Move-In-Money-Saver-Kit-2026-27.zip`
   - `START-HERE.pdf`
3. Configure delivery settings:
   - Delivery method: Email after purchase (Dodo sends automatically)
   - Download attempts: Set a reasonable limit (e.g., 5 downloads)
   - Download expiry: Set appropriate expiry (e.g., 30 days or permanent)
4. Save the digital delivery configuration

> **Note:** Dodo's exact UI labels may differ from the above. Look for "Digital Delivery," "Files," or "Downloads" in your product settings. Consult Dodo's current documentation at https://docs.dodopayments.com for the latest interface.

---

## 6. Get Your Product ID

1. On the product page, find the **Product ID** (usually visible in the URL or product details panel)
2. Copy this ID
3. Add it to your environment variables:
   ```
   NEXT_PUBLIC_DODO_PRODUCT_ID=your_product_id_here
   ```

---

## 7. Get Your API Keys

1. Navigate to **Settings → API Keys** (or **Developer → API Keys**)
2. You will see separate **Test** and **Live** API keys
3. For development: copy the **Test** API key
4. Add to `.env.local`:
   ```
   DODO_API_KEY=your_test_api_key_here
   DODO_MODE=test
   ```

⚠️ **Never commit API keys to version control.**  
⚠️ **Never expose the API key in client-side code.**

---

## 8. Configure Success/Return URL

1. In Dodo dashboard, navigate to **Settings → Checkout** (or product settings)
2. Find the **Return URL** or **Success URL** field
3. Add your success URL:
   - **Test:** `http://localhost:3000/success`
   - **Production:** `https://YOURDOMAIN.com/success`
4. Also add a **Cancel URL:**
   - **Test:** `http://localhost:3000/?checkout=cancelled`
   - **Production:** `https://YOURDOMAIN.com/?checkout=cancelled`

> Note: Our application passes these URLs dynamically via the API. Verify whether Dodo requires them to be pre-configured in the dashboard or only via API.

---

## 9. Configure Webhook

1. Navigate to **Settings → Webhooks** (or **Developer → Webhooks**)
2. Click **Add Endpoint** (or **Create Webhook**)
3. Enter your webhook URL:
   - **Test (using ngrok or similar):** `https://your-ngrok-url.ngrok.io/api/webhooks/dodo`
   - **Production:** `https://YOURDOMAIN.com/api/webhooks/dodo`
4. Select events to receive:
   - `payment.succeeded` (required)
   - Any other payment status events (cancelled, failed, refunded)
5. Click **Save** / **Create**
6. Copy the **Webhook Secret** (signing secret)
7. Add to `.env.local`:
   ```
   DODO_WEBHOOK_SECRET=your_webhook_secret_here
   ```

---

## 10. Test the Integration

See [DODO-TESTING.md](./DODO-TESTING.md) for the complete test procedure.

---

## 11. Switch to Live Mode

When ready for real transactions:

1. In Dodo dashboard, ensure your verification is approved
2. Get your **Live API Key** from Settings → API Keys
3. In Vercel (production), update environment variables:
   ```
   DODO_API_KEY=your_LIVE_api_key
   DODO_MODE=live
   ```
4. Update webhook URL in Dodo dashboard to your production URL
5. Run a real $17 test purchase to verify the live flow
6. Confirm you receive the payout

---

## 12. Verify Payout Configuration

1. Check **Settings → Payouts** for your payout schedule
2. Verify your bank account is connected and verified
3. Note the payout timing (Dodo's schedule may vary)

---

## Important Notes

> Dashboard UI labels and navigation paths are based on Dodo Payments documentation as of the time of writing. If the dashboard UI has changed, refer to the current Dodo Payments documentation at **https://docs.dodopayments.com**.

> Dodo's support email/chat is the authoritative source for dashboard-specific questions.
