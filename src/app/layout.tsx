import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PRODUCT } from "@/config/product";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "College Move-In Money Saver Kit 2026–27 | Dorm Packing & Budget System",
  description:
    "Plan your college move-in with a complete dorm packing list, budget calculator, roommate planner, shopping trackers and move-in checklists.",
  keywords: [
    "college move-in checklist",
    "dorm packing list",
    "college budget calculator",
    "roommate planner",
    "college move-in kit",
    "dorm essentials",
    "college freshman packing list",
  ],
  authors: [{ name: PRODUCT.businessLegalName }],
  openGraph: {
    title: "College Move-In Money Saver Kit 2026–27",
    description:
      "Pack smarter, stay on budget, coordinate with your roommate and get your dorm ready with one complete move-in system.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "College Move-In Money Saver Kit 2026–27 — Dorm Packing & Budget System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Move-In Money Saver Kit 2026–27",
    description:
      "Pack smarter, stay on budget, coordinate with your roommate and get your dorm ready with one complete move-in system.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: PRODUCT.appUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#FFF9F1] text-[#242424]">
        {/* Google Analytics 4 */}
        {PRODUCT.ga4MeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${PRODUCT.ga4MeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${PRODUCT.ga4MeasurementId}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}

        {/* Pinterest Tag */}
        {PRODUCT.pinterestTagId && (
          <Script id="pinterest-tag" strategy="afterInteractive">
            {`
              !function(e){if(!window.pintrk){window.pintrk = function () {
              window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
              n=window.pintrk;n.queue=[],n.version="3.0";var
              t=document.createElement("script");t.async=!0,t.src=e;var
              r=document.getElementsByTagName("script")[0];
              r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
              pintrk('load', '${PRODUCT.pinterestTagId}', {em: '<user_email_address>'});
              pintrk('page');
            `}
          </Script>
        )}

        {/* Meta Pixel — disabled by default */}
        {PRODUCT.metaPixelEnabled && PRODUCT.metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PRODUCT.metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {children}
      </body>
    </html>
  );
}
