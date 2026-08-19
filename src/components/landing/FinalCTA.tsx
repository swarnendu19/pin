"use client";

import { FINAL_CTA } from "@/content/landing";
import { PurchaseButton } from "@/components/checkout/PurchaseButton";
import { PRODUCT } from "@/config/product";

export function FinalCTA() {
  return (
    <section className="py-24 bg-[#17233C] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <h2 className="font-display text-4xl md:text-6xl font-semibold mb-8 leading-tight">
          <span className="block text-[#DCEBFF]">{FINAL_CTA.headlineL1}</span>
          <span className="block text-white">{FINAL_CTA.headlineL2}</span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          {FINAL_CTA.body}
        </p>

        <div className="mb-12 p-6 bg-white/5 rounded-2xl border border-white/10 inline-block">
          <div className="text-sm font-medium tracking-widest text-[#FFD66B] uppercase mb-2">
            {PRODUCT.productName}
          </div>
          <div className="text-5xl font-display font-semibold text-white">
            {PRODUCT.priceDisplay}
          </div>
        </div>

        <div>
          <PurchaseButton 
            label={FINAL_CTA.cta}
            location="final"
            className="px-12 py-5 text-lg"
          />
          <p className="mt-5 text-sm text-white/50">
            {FINAL_CTA.microcopy}
          </p>
        </div>

      </div>
    </section>
  );
}
