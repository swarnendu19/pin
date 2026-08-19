/**
 * Legal page content — placeholders marked with [BRACKETS].
 * Replace all bracketed values before going live.
 * See SETUP-CHECKLIST.md for the full list of required replacements.
 */

export const LEGAL = {
  businessLegalName: "[BUSINESS LEGAL NAME]",
  supportEmail: "[SUPPORT EMAIL]",
  businessAddress: "[BUSINESS ADDRESS IF REQUIRED]",
  country: "United States",
  effectiveDate: "January 1, 2026",

  privacy: {
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains how [BUSINESS LEGAL NAME] ("we", "us", or "our") collects, uses and protects your personal information when you visit our website and purchase our digital products.",
    sections: [
      {
        heading: "Information We Collect",
        body: `We collect information you provide when making a purchase (name, email address, and billing information). Payment card details are processed directly by our payment processor, Dodo Payments — we never receive or store your full card number.

We also automatically collect standard web data: IP address, browser type, referring URL, pages visited, and general location. This data is collected through analytics tools including Google Analytics 4 and Pinterest Tag.`,
      },
      {
        heading: "How We Use Your Information",
        body: `We use your information to:
• Process and fulfill your purchase
• Send your digital product access information
• Respond to customer support requests
• Analyze how visitors use our website to improve our products
• Comply with legal obligations

We do not sell your personal information to third parties.`,
      },
      {
        heading: "Analytics and Tracking",
        body: `We use Google Analytics 4 and Pinterest Tag to understand how visitors find and use our website. These services may use cookies and similar tracking technologies. You can opt out of Google Analytics at https://tools.google.com/dlpage/gaoptout.`,
      },
      {
        heading: "Cookies",
        body: `We use minimal cookies required for website functionality and analytics. We do not use cookies to track you across unrelated websites for advertising purposes beyond the Pinterest Tag described above.`,
      },
      {
        heading: "Data Retention",
        body: `We retain purchase records as required for tax and legal compliance. Analytics data is retained according to the respective platform's policies (Google Analytics default is 14 months).`,
      },
      {
        heading: "Your Rights",
        body: `Depending on your location, you may have rights regarding your personal data including access, correction, deletion, or portability. To exercise these rights, contact us at [SUPPORT EMAIL].`,
      },
      {
        heading: "Third-Party Services",
        body: `Our checkout is powered by Dodo Payments. Their privacy policy governs how they handle your payment information. Digital product delivery may also be managed through Dodo Payments' delivery infrastructure.`,
      },
      {
        heading: "Contact Us",
        body: `Questions about this policy? Email us at [SUPPORT EMAIL].`,
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    intro:
      "By purchasing or using the College Move-In Money Saver Kit, you agree to these Terms of Service. Please read them carefully.",
    sections: [
      {
        heading: "Digital Product License",
        body: `Upon purchase, you receive a personal, non-transferable license to use the College Move-In Money Saver Kit for your own personal, non-commercial use. You may not resell, redistribute, share publicly, or create derivative products from our materials.`,
      },
      {
        heading: "No Account Required",
        body: `We do not require you to create an account on our website. Your purchase is processed through Dodo Payments and your digital product access is delivered as described on our product pages.`,
      },
      {
        heading: "Digital Delivery",
        body: `After successful payment, you will receive access to your digital files as described at checkout. Because the product is digital and delivered immediately, please review our Refund Policy before purchasing.`,
      },
      {
        heading: "Disclaimer",
        body: `The College Move-In Money Saver Kit is an organizational tool. It does not guarantee specific savings, outcomes, or compatibility with every college or university. Dorm rules, dimensions and policies vary by institution. Always verify with your school's housing office.

The kit is provided "as is" without warranty of any kind. We are not responsible for any errors or omissions.`,
      },
      {
        heading: "Limitation of Liability",
        body: `To the maximum extent permitted by law, our total liability for any claim arising from your use of this product is limited to the amount you paid for the product ($17).`,
      },
      {
        heading: "Governing Law",
        body: `These terms are governed by the laws of [BUSINESS LEGAL NAME]'s jurisdiction. [BUSINESS ADDRESS IF REQUIRED].`,
      },
      {
        heading: "Changes to Terms",
        body: `We may update these terms from time to time. Continued use of the product after changes constitutes acceptance of the new terms.`,
      },
      {
        heading: "Contact",
        body: `Questions? Reach us at [SUPPORT EMAIL].`,
      },
    ],
  },

  refund: {
    title: "Refund Policy",
    intro:
      "We stand behind our product and want you to be satisfied with your purchase. Here is our policy for the College Move-In Money Saver Kit.",
    sections: [
      {
        heading: "Digital Product Nature",
        body: `The College Move-In Money Saver Kit is a digital product. Upon successful payment, the files become available for download. Because of the immediate nature of digital delivery, we follow a limited refund policy.`,
      },
      {
        heading: "Refund Eligibility",
        body: `If you have not yet accessed or downloaded your files, please contact us within 24 hours of purchase and we will review your request.

If you experienced a technical issue that prevented you from accessing your files, contact us and we will work to resolve it promptly.

We do not offer refunds simply because you changed your mind after accessing the product.`,
      },
      {
        heading: "How to Request",
        body: `Email us at [SUPPORT EMAIL] within 7 days of your purchase with your order details and a description of the issue. We will respond within 2 business days.`,
      },
      {
        heading: "Chargebacks",
        body: `If you have a concern with your purchase, please contact us directly before initiating a chargeback. We are happy to work with you to resolve issues fairly.`,
      },
      {
        heading: "Changes to Policy",
        body: `We may update this policy. The policy in effect at the time of your purchase applies to that purchase.`,
      },
    ],
    note: "MERCHANT NOTE: Review this policy with legal counsel before going live. This template provides a reasonable starting point for digital product refunds but is not legal advice.",
  },
};
