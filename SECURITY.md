# Security Review — College Move-In Money Saver Kit

## Summary

This document covers the security posture of the sales funnel application.

---

## Secrets Management

| Item | Status | Notes |
|------|--------|-------|
| `DODO_API_KEY` | ✅ Server-side only | Used only in `/api/checkout/create` and `/api/checkout/verify` |
| `DODO_WEBHOOK_SECRET` | ✅ Server-side only | Used only in `/api/webhooks/dodo` |
| `.env.local` not committed | ✅ `.gitignore` includes `.env*` | Verify before pushing |
| No secrets in client code | ✅ Only `NEXT_PUBLIC_*` vars reach browser | API key naming enforces this |

---

## Payment Security

| Item | Status | Notes |
|------|--------|-------|
| No card data on our server | ✅ | Dodo hosted checkout handles all card data |
| PCI scope | ✅ Minimal | We are a merchant using a hosted checkout — no card data touches our infrastructure |
| Purchase verification | ✅ Server-side | `/api/checkout/verify` verifies payment status via Dodo API before purchase event fires |
| Client cannot fake purchase | ✅ | `/success` page verifies server-side — URL manipulation does not trigger purchase event |
| Webhook signature verified | ✅ | `/api/webhooks/dodo` rejects unverified requests with 401 |

---

## API Security

| Item | Status | Notes |
|------|--------|-------|
| Rate limiting on checkout create | ✅ | In-memory: 10 requests per IP per minute |
| Input validation | ✅ | Checkout create validates required fields before calling Dodo |
| No arbitrary redirects | ✅ | Redirect URLs are constructed from `PRODUCT.appUrl` (env var) |
| SQL injection | N/A | No database used |
| XSS protection | ✅ | React escapes all rendered content; `X-XSS-Protection` header set |

---

## Security Headers

Set in `next.config.ts`:

| Header | Value |
|--------|-------|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | Set — allows required third-party scripts |

---

## Webhook Security

```
1. Raw body read BEFORE JSON parsing
2. Signature verified using Dodo SDK before any processing
3. Invalid signatures → 401 response, no processing
4. Idempotency via in-memory event ID Map
5. No sensitive data logged (no card numbers, no full email addresses)
6. Returns 200 quickly after verification
```

---

## Data Handling

| Data | Where | How Long |
|------|-------|----------|
| Payment data | Dodo's servers only | Per Dodo's privacy policy |
| UTM parameters | Browser sessionStorage/localStorage | 30 days (TTL enforced in code) |
| Analytics events | GA4 / Pinterest servers | Per their respective policies |
| Webhook event IDs | In-process memory | Until server restart |
| No PII collected by our app | ✅ | We never collect name/email directly |

---

## Product Download Security

| Item | Status | Notes |
|------|--------|-------|
| No permanent public download URL | ✅ | Product delivered by Dodo, not by us |
| No product exposed in our codebase | ✅ | Zip file never on our servers |
| Download link control | Dodo managed | Dodo handles access control, expiry, download limits |

---

## Known Limitations (V1)

| Issue | Severity | Notes |
|-------|----------|-------|
| Rate limiting is in-memory | Low | Resets on server restart; fine for serverless. For high-traffic, add Redis-backed rate limiting |
| Webhook idempotency is in-memory | Low | Same — acceptable for V1 serverless deployment. Add a database for multi-instance production |
| No CAPTCHA on checkout | Low | Dodo's hosted checkout handles bot detection |

---

## Sensitive Logging Policy

**What IS logged:**
- Webhook event type, event ID, timestamp (safe)
- Checkout initiation (no customer data)
- Verification outcome (verified/not verified)
- Server errors (without stack traces or customer data in production)

**What is NEVER logged:**
- API keys
- Webhook secrets
- Card numbers (never reach our server)
- Full customer email addresses
- Payment amounts with customer-identifying context

---

## Checklist Before Going Live

- [ ] `.env.local` is in `.gitignore` (verify: `git status`)
- [ ] No secrets visible in client bundle (`NEXT_PUBLIC_*` only — no DODO_API_KEY)
- [ ] Security headers verified (use https://securityheaders.com)
- [ ] CSP policy reviewed for your specific third-party scripts
- [ ] Webhook signature verification tested
- [ ] Dodo live API key stored only in Vercel (not in code)
- [ ] Product download URL not accessible without valid Dodo delivery token

---

## Reporting Security Issues

If you discover a security vulnerability, contact: `[SUPPORT EMAIL]`

Do not publicly disclose security issues before they are resolved.
