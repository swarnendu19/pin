"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { VALUE_STACK } from "@/content/landing";
import { PurchaseButton } from "@/components/checkout/PurchaseButton";
import { PRODUCT } from "@/config/product";

export function ValueStack() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="bg-[#FFF9F1] rounded-3xl p-8 md:p-14 border border-[#17233C]/5 shadow-2xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#17233C] mb-10">
            {VALUE_STACK.headline}
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-left max-w-2xl mx-auto mb-10">
            {VALUE_STACK.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 border-b border-gray-200/50 pb-3">
                <Check className="w-5 h-5 text-[#FF826E] shrink-0" />
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-500 italic max-w-lg mx-auto mb-10">
            {VALUE_STACK.bridge}
          </p>

          <div className="mb-10">
            <div className="text-gray-500 font-medium uppercase tracking-widest text-xs mb-2">
              Complete Kit
            </div>
            <div className="text-6xl md:text-7xl font-display font-semibold text-[#17233C]">
              {PRODUCT.priceDisplay}
            </div>
          </div>

          <PurchaseButton 
            label={VALUE_STACK.cta} 
            location="final" 
            className="text-lg px-10 py-5 w-full sm:w-auto"
          />
          
          <p className="mt-6 text-sm text-gray-400 font-medium px-4">
            {VALUE_STACK.microcopy}
          </p>
        </div>

      </div>
    </section>
  );
}
