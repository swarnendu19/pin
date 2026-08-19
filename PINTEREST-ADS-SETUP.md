# Pinterest Ads Setup Guide

## 1. Pinterest Business Account

1. Go to https://business.pinterest.com
2. Create or convert to a Business account
3. Complete your business profile:
   - Business name: [Your Brand]
   - Website: https://YOURDOMAIN.com
   - Category: Education or Products
4. Claim your website (see Pinterest Tag setup in PINTEREST-TRACKING.md)

---

## 2. Pinterest Ads Account

1. From Pinterest Business, go to **Ads** → **Overview**
2. Set up billing (credit card required before running ads)
3. Choose your currency: USD

---

## 3. Pinterest Tag

Set up the Pinterest Tag before running ads. See [PINTEREST-TRACKING.md](./PINTEREST-TRACKING.md) for full instructions.

Verify the tag is firing correctly before spending money on ads.

---

## 4. Conversion Events Configuration

In Pinterest Ads → Conversions:

1. Create a **Checkout** conversion event for the purchase
   - Event: `checkout`
   - Value: $17 (use order-level value for accurate ROAS)
2. Verify the conversion event is receiving data via the Pinterest Tag Helper
3. Allow 24–48 hours after a test purchase before conversions appear

---

## 5. UTM Naming Convention

Use consistent UTM parameters across all Pinterest ads:

| Parameter | Value |
|-----------|-------|
| `utm_source` | `pinterest` |
| `utm_medium` | `paid_social` |
| `utm_campaign` | `college_movein_2026` |
| `utm_content` | `{creative-identifier}` (e.g., `packing-list-pin-v1`) |
| `utm_term` | Optional (ad set or targeting descriptor) |

**Example destination URL:**
```
https://YOURDOMAIN.com/?utm_source=pinterest&utm_medium=paid_social&utm_campaign=college_movein_2026&utm_content=packing-list-pin-v1
```

Pinterest also automatically appends `epik` to clicks — our site captures this for enhanced attribution.

---

## 6. Ad Creative Specs

### Standard Pin (Recommended)
- **Ratio:** 2:3 (portrait)
- **Size:** 1000×1500 px
- **Format:** JPG or PNG
- **Max file size:** 32 MB

### Square Pin
- **Ratio:** 1:1
- **Size:** 1000×1000 px

### Video Pin
- **Ratio:** 2:3 or 9:16
- **Length:** 6–15 seconds for ads (up to 60 seconds)

**Save your ad images to:** `/public/marketing/`

---

## 7. Campaign Setup

### Recommended First Campaign: Conversion Campaign

**Goal:** Conversions (checkout event)

**Targeting suggestions for initial test:**
- **Age:** 18–24 (students) + 35–55 (parents)
- **Geography:** United States
- **Interests:** College, Back to School, Dorm Room, Organization, Student Life
- **Keywords:** college move-in, dorm essentials, college packing list, college freshman checklist

**Budget to start:**
- Begin with $10–20/day
- Do NOT scale until you have confirmed conversion tracking and at least 3–5 purchases attributed

**Bid strategy:** Start with automatic bidding.

---

## 8. Confirming Attribution Before Scaling

Before spending meaningful budget, verify:

- [ ] Pinterest Tag is firing `pagevisit` on landing page
- [ ] Pinterest Tag is firing `checkout` on CTA click
- [ ] Pinterest Tag is firing `checkout` on purchase with `order_id`
- [ ] Test purchase shows up in Pinterest Ads → Analytics → Conversions (allow 24–48h)
- [ ] UTM parameters are being captured correctly
- [ ] GA4 is also recording the purchase (for cross-verification)

Only scale ad spend after conversions are verified in both GA4 and Pinterest.

---

## 9. Ad Copy Direction

**Headlines that work for Pinterest:**
- "Everything you need for dorm move-in (under $20)"
- "The checklist that saves you from 3am Amazon panics"
- "Pack smarter. Spend less. Move in organized."
- "Stop buying things your roommate is already bringing"

**Description format:**
- Short (125 characters or less)
- Specific outcome ("250+ item packing system, budget calculator & roommate planner")
- Clear price ("$17 one-time")

---

## 10. Tracking Verification Checklist

Before your first paid campaign:
- [ ] Pinterest Tag fires on landing page
- [ ] CTA click fires checkout event
- [ ] Purchase fires checkout event with order_id and value=17
- [ ] Pinterest domain verification complete
- [ ] UTM parameters show up in GA4 traffic sources
- [ ] Conversion window set appropriately (recommend: 30 days click, 1 day view)
