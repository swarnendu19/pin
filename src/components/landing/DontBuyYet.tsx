"use client";

import { motion } from "framer-motion";
import { DONT_BUY_YET } from "@/content/landing";
import { PurchaseButton } from "@/components/checkout/PurchaseButton";

export function DontBuyYet() {
  return (
    <section className="py-24 bg-[#17233C] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 text-[#DCEBFF]">
          {DONT_BUY_YET.headline}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {DONT_BUY_YET.items.map((item, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20 line-through decoration-red-400 decoration-2"
            >
              {item}
            </motion.span>
          ))}
        </div>

        <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          {DONT_BUY_YET.body}
        </p>

        <PurchaseButton 
          label={DONT_BUY_YET.cta} 
          variant="secondary"
          location="product" 
        />
        
      </div>
    </section>
  );
}
