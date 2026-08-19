# Deployment Guide — Vercel

## Overview

The app is designed for **Vercel** deployment with the Next.js App Router.

---

## 1. GitHub Repository

```bash
# Initialize git (if not already)
cd "e:/Digital Product/landing"
git init
git add .
git commit -m "Initial commit — College Move-In Kit sales funnel"

# Create a GitHub repository at https://github.com/new
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Add `.env.local` to `.gitignore` (already configured). Never commit real credentials.

---

## 2. Vercel Setup

1. Go to https://vercel.com and sign in (or create account)
2. Click **Add New → Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — no build configuration needed
5. Click **Deploy** (first deploy will fail until you add env variables — that's OK)

---

## 3. Environment Variables in Vercel

In your Vercel project → **Settings → Environment Variables**, add all production values:

| Variable | Example Value | Environment |
|----------|--------------|-------------|
| `DODO_API_KEY` | `live_...` | Production only |
| `DODO_WEBHOOK_SECRET` | `whsec_...` | Production only |
| `DODO_MODE` | `live` | Production only |
| `NEXT_PUBLIC_DODO_PRODUCT_ID` | `prod_...` | All |
| `NEXT_PUBLIC_APP_URL` | `https://YOURDOMAIN.com` | Production only |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Production only |
| `NEXT_PUBLIC_PINTEREST_TAG_ID` | `12345678` | Production only |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | `support@yourdomain.com` | All |
| `NEXT_PUBLIC_CHECKOUT_ENABLED` | `true` | All |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | `false` | Production only |

For Preview/Development environments: use test credentials.

---

## 4. Custom Domain

1. In Vercel project → **Settings → Domains**
2. Click **Add**
3. Enter your domain: `yourdomain.com`
4. Follow DNS configuration instructions (Vercel provides the exact records)
5. Wait for DNS propagation (minutes to hours)
6. SSL certificate is provisioned automatically by Vercel

---

## 5. Update Dodo Webhook URL

Once your domain is connected:

1. Go to Dodo dashboard → Settings → Webhooks
2. Update your webhook endpoint URL to:
   `https://YOURDOMAIN.com/api/webhooks/dodo`
3. Verify the webhook secret matches `DODO_WEBHOOK_SECRET` in Vercel

---

## 6. Verify Production Deployment

```bash
# Check build passes locally first
npm run build

# Then check Vercel deployment
# Vercel automatically deploys on git push to main branch
```

After deploying:
- [ ] Landing page loads: `https://YOURDOMAIN.com`
- [ ] Analytics are firing (check GA4 DebugView with a test visit)
- [ ] Pinterest Tag fires on page load
- [ ] CTA button opens Dodo checkout
- [ ] Success page loads correctly
- [ ] Legal pages load: `/privacy`, `/terms`, `/refund-policy`, `/contact`
- [ ] Sitemap is accessible: `https://YOURDOMAIN.com/sitemap.xml`
- [ ] robots.txt is accessible: `https://YOURDOMAIN.com/robots.txt`

---

## 7. Production Test Purchase

Before announcing the product:

1. Complete a real $17 purchase using a real card
2. Verify success page shows correctly
3. Verify GA4 purchase event fires with value=$17
4. Verify Pinterest purchase event fires with order_id
5. Verify Dodo sends product delivery email
6. Verify payout is expected in Dodo dashboard

---

## 8. Monitoring

Vercel provides built-in monitoring:
- **Vercel Dashboard → Functions**: Monitor API route performance and errors
- **Vercel Dashboard → Logs**: Real-time application logs
- **Vercel Analytics**: Optional — enable for additional performance data (paid feature)

For production error monitoring, consider adding Sentry:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## 9. Continuous Deployment

After the initial setup, every push to `main` triggers an automatic deployment.

For safe deployments:
1. Test changes locally with `npm run build`
2. Push to a feature branch
3. Vercel creates a preview deployment automatically
4. Test the preview URL
5. Merge to main for production deployment

---

## Build Commands (Vercel auto-detects these)

| Command | Purpose |
|---------|---------|
| `npm run build` | Next.js production build |
| `npm run start` | Production server (not used on Vercel) |
| `npm run dev` | Local development |
