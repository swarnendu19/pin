"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PARENT_SECTION } from "@/content/landing";
import { PurchaseButton } from "@/components/checkout/PurchaseButton";

export function ParentSection() {
  return (
    <section className="py-24 bg-[#FFD66B]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold text-[#FF826E] tracking-widest uppercase mb-4">
              {PARENT_SECTION.eyebrow}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#17233C] mb-6 leading-tight">
              {PARENT_SECTION.headline}
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {PARENT_SECTION.body}
            </p>
            
            <PurchaseButton 
              label={PARENT_SECTION.cta} 
              location="parent" 
              className="w-full sm:w-auto"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-[#FFD66B]/10"
          >
            <h3 className="font-display text-xl font-semibold text-[#17233C] mb-6 border-b border-gray-100 pb-4">
              Peace of mind included:
            </h3>
            <ul className="space-y-4">
              {PARENT_SECTION.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#FF826E] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
