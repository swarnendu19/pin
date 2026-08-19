# Pinterest Tracking Guide

## Overview

The site uses Pinterest Tag to track conversions from Pinterest Ads.
Events are fired through the unified `analytics.ts` abstraction.

---

## Pinterest Tag ID Setup

1. Go to https://ads.pinterest.com
2. Navigate to **Ads → Conversions**
3. Click **Create a Pinterest tag**
4. Follow the setup wizard
5. Copy your **Tag ID** (a numeric string like `2617826352831`)
6. Add to environment variables:
   ```
   NEXT_PUBLIC_PINTEREST_TAG_ID=your_tag_id_here
   ```

The tag loads automatically via `src/app/layout.tsx` when the ID is set.

---

## Events Fired

| Event | When | Pinterest Event Name |
|-------|------|---------------------|
| Page visit | Every page load | `pagevisit` |
| View product | Above-fold impression | `viewcategory` |
| Checkout started | CTA click → checkout | `checkout` |
| Purchase | After payment verified | `checkout` (with order_id) |

> Note: Pinterest uses `checkout` for both checkout initiation and completed purchase.
> The purchase event includes `order_id` (Dodo transaction ID) which Pinterest uses to deduplicate.

---

## Purchase Event Data

When a purchase is verified, the Pinterest tag receives:
```javascript
pintrk('track', 'checkout', {
  value: 17,
  order_quantity: 1,
  currency: 'USD',
  order_id: 'dodo_transaction_id_here'
});
```

The `order_id` is critical for:
- Attribution deduplication
- Conversion value reporting
- Enhanced match

---

## How to Test

### Method 1: Pinterest Tag Helper Chrome Extension
1. Install [Pinterest Tag Helper](https://chrome.google.com/webstore/detail/pinterest-tag-helper/epmomlhdjfgdobefcpocockpjihaabdp)
2. Load your website
3. Click the extension — it shows all fired Pinterest events in real time

### Method 2: Browser Console
With `NEXT_PUBLIC_ANALYTICS_DEBUG=true`:
```
[Analytics] pageView { url: '/' }
[Analytics] checkoutStarted
[Analytics] purchase { transactionId: 'xxx', value: 17 }
```

### Method 3: Pinterest Analytics
After firing real events, check **Pinterest Ads → Analytics** (may take 24–48h to appear).

---

## Preventing Duplicate Purchase Events

The purchase event is protected by three layers:

1. **Server-side verification**: `/api/checkout/verify` confirms payment status before the client fires any event
2. **Component-level guard**: The success page's `SuccessContent` component uses a `useRef` to ensure `analytics.purchase()` fires only once per mount
3. **Order ID deduplication**: Pinterest uses the `order_id` field to deduplicate events on their side

---

## Domain Verification

Pinterest may require domain verification before full conversion tracking works:

1. In Pinterest → Settings → Claim → Claim a website
2. Add the provided meta tag to your `layout.tsx` in the `<head>`:
   ```html
   <meta name="p:domain_verify" content="your_verification_code_here" />
   ```
3. Click **Verify** in Pinterest dashboard

---

## UTM Parameters for Pinterest Ads

Pinterest Ads automatically append the `epik` parameter to clicks. This is captured by `src/lib/utm.ts` and stored in sessionStorage.

Recommended UTM structure for Pinterest Ads:
```
utm_source=pinterest
utm_medium=paid_social
utm_campaign=college_movein_2026
utm_content={ad-creative-name}
```

Example Pinterest destination URL:
```
https://YOURDOMAIN.com/?utm_source=pinterest&utm_medium=paid_social&utm_campaign=college_movein_2026&utm_content=packing-list-pin
```

---

## Server-Side / Enhanced Conversions

Pinterest supports server-side event matching for improved attribution accuracy.

**Current status:** Client-side only (V1).

**Future upgrade:** The Dodo webhook handler (`/api/webhooks/dodo`) fires on confirmed purchases server-side. To add server-side Pinterest conversion reporting:
1. Use Pinterest's Conversions API (https://developers.pinterest.com/docs/conversions/conversions/)
2. Send the conversion event from the webhook handler using the Dodo transaction ID
3. This improves attribution when cookies are blocked

Document this in a future sprint — do not build it in V1 unless you have evidence that attribution is suffering from cookie blocking.

---

## Troubleshooting

### Pinterest Tag not firing
- Check `NEXT_PUBLIC_PINTEREST_TAG_ID` is set in `.env.local`
- Check browser console for Pinterest Tag Helper extension
- Ensure no ad blockers are interfering with testing

### Purchase not attributed to Pinterest
- Verify `epik` parameter is being captured in UTM storage
- Verify `order_id` is included in purchase event
- Allow 24–48 hours for Pinterest to process conversions
- Check if domain is verified in Pinterest settings

### Duplicate purchase events
- Check success page is not accessible by direct URL without `payment_id`
- Verify server-side payment verification is working
