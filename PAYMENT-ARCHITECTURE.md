# Payment Architecture

## Decision

**Chosen method:** Dodo Payments hosted checkout (redirect-based)

## Why This Method

| Criterion | Decision |
|-----------|----------|
| Mobile experience | ✅ Dodo's hosted page is optimized for mobile |
| PCI compliance | ✅ Zero card data touches our server |
| SDK support | ✅ Official `dodopayments` npm package |
| Reliability | ✅ Battle-tested hosted checkout |
| Analytics integration | ✅ Redirect URL carries payment ID for verification |
| Overlay checkout | Considered but redirect is simpler and more reliable for initial launch |

**Overlay checkout** was considered — it keeps the buyer on our page visually. However, redirect-based checkout is more reliable across all browsers, doesn't require managing an iframe, and is the officially recommended path for most Dodo integrations. It can be switched to overlay later if testing shows benefit.

---

## Flow

```
Customer clicks PurchaseButton
         ↓
POST /api/checkout/create (server)
  → Dodo API: create checkout session
  → Returns: checkoutUrl
         ↓
Client redirects to checkoutUrl (Dodo hosted page)
         ↓
Customer completes payment on Dodo
         ↓
Dodo redirects to: /success?payment_id=xxx&...
         ↓
/success page: GET /api/checkout/verify?payment_id=xxx
  → Dodo API: fetch payment status
  → If status == succeeded: fire purchase event
         ↓
Dodo webhook fires: POST /api/webhooks/dodo
  → Verify signature
  → Log event safely
  → Handle idempotently
```

---

## API Routes

### `POST /api/checkout/create`
- **Server-side only** — uses `DODO_API_KEY` (never exposed to client)
- Creates checkout session with product ID, success/cancel URLs
- Passes UTM metadata through checkout
- Returns `{ checkoutUrl }` for client redirect
- Rate limited: 10 requests per IP per minute

### `GET /api/checkout/verify`
- Called server-side from `/success` page
- Verifies payment status via Dodo API
- Returns `{ verified: boolean, transactionId: string }`
- **Only returns `verified: true` if payment is confirmed** — never inferred from URL alone

### `POST /api/webhooks/dodo`
- Receives Dodo webhook events
- **Verifies signature before any processing**
- Handles `payment.succeeded` (and other relevant events)
- Idempotent — tracks processed event IDs
- No sensitive data logged

---

## Environment Variables

```
DODO_API_KEY=...           # Server-side only
DODO_WEBHOOK_SECRET=...    # Server-side only
DODO_MODE=test|live        # Server-side only
NEXT_PUBLIC_DODO_PRODUCT_ID=...  # Safe to expose (public product ID)
```

---

## Future Order Bump Architecture

The checkout session creation (`POST /api/checkout/create`) accepts an `items` array in its structure. To add an order bump in the future:

1. Add bump product to Dodo dashboard (get its product ID)
2. Show bump UI on landing page (with opt-in checkbox)
3. Pass `bumpAccepted: boolean` to `/api/checkout/create`
4. Server adds bump item to checkout session if accepted
5. Update success page and analytics to handle multi-item purchases

**No changes to PurchaseButton architecture required** — the button already passes metadata that can carry bump selection state.

See [FUTURE-UPSELL-NOTES.md](./FUTURE-UPSELL-NOTES.md) for more detail.

---

## Security Considerations

- API key stays on server — never reaches the browser
- Product download URL is managed by Dodo — we never expose a permanent download link
- Payment verification is always server-side — the client cannot fake a successful purchase
- Webhook signature verification prevents fake webhook events

---

## Test vs Production

| Setting | Test | Production |
|---------|------|-----------|
| `DODO_MODE` | `test` | `live` |
| `DODO_API_KEY` | Test key from Dodo dashboard | Live key from Dodo dashboard |
| Checkout URL | Dodo test environment | Dodo production |
| Actual charges | No real money | Real $17 charge |

See [DODO-TESTING.md](./DODO-TESTING.md) for test credentials and procedure.
