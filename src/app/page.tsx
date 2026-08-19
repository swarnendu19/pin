import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { WhatIsIncluded } from "@/components/landing/WhatIsIncluded";
import { BudgetFeature } from "@/components/landing/BudgetFeature";
import { BuyBringSkip } from "@/components/landing/BuyBringSkip";
import { RoommateSection } from "@/components/landing/RoommateSection";
import { MoveInTimeline } from "@/components/landing/MoveInTimeline";
import { DontBuyYet } from "@/components/landing/DontBuyYet";
import { ParentSection } from "@/components/landing/ParentSection";
import { ValueStack } from "@/components/landing/ValueStack";
import { ProductFormat } from "@/components/landing/ProductFormat";
import { SocialProof } from "@/components/landing/SocialProof";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";
import { Footer } from "@/components/landing/Footer";
import { PRODUCT } from "@/config/product";
import UTMCapture from "@/components/analytics/UTMCapture";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": PRODUCT.productName,
    "description": PRODUCT.description,
    "offers": {
      "@type": "Offer",
      "price": PRODUCT.price,
      "priceCurrency": PRODUCT.currency,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": PRODUCT.businessLegalName
      }
    }
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UTMCapture />
      
      <Header />
      <HeroSection />
      <ProblemSection />
      <TransformationSection />
      <WhatIsIncluded />
      <BudgetFeature />
      <BuyBringSkip />
      <RoommateSection />
      <MoveInTimeline />
      <DontBuyYet />
      <ParentSection />
      <ValueStack />
      <ProductFormat />
      <SocialProof />
      <FAQSection />
      <FinalCTA />
      
      <StickyMobileCTA />
      <Footer />
    </main>
  );
}
