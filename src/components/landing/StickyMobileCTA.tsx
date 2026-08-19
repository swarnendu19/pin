"use client";

import { useState, useEffect } from "react";
import { PurchaseButton } from "@/components/checkout/PurchaseButton";
import { PRODUCT } from "@/config/product";
import { cn } from "@/lib/utils";

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (~600px), hide near bottom
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;
      
      const pastHero = scrollY > 600;
      const nearBottom = scrollY + windowHeight >= documentHeight - 800; // hide before footer/faq
      
      setIsVisible(pastHero && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out pb-safe",
        isVisible ? "translate-y-0" : "translate-y-[150%]"
      )}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-4 py-3 flex items-center justify-between">
        <div>
          <div className="font-display font-semibold text-[#17233C] text-sm">
            {PRODUCT.shortName}
          </div>
          <div className="font-semibold text-[#FF826E] text-base">
            {PRODUCT.priceDisplay}
          </div>
        </div>
        <PurchaseButton 
          label="Get The Kit"
          location="sticky"
          className="px-6 py-2.5 text-sm"
        />
      </div>
    </div>
  );
}
