"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { WHATS_INCLUDED } from "@/content/landing";
import { PurchaseButton } from "@/components/checkout/PurchaseButton";

export function WhatIsIncluded() {
  return (
    <section id="whats-included" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#17233C]">
            {WHATS_INCLUDED.headline}
          </h2>
        </div>

        {/* Featured Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHATS_INCLUDED.featured.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-full"
              style={{ backgroundColor: item.accent + '15' }} // 15 = ~8% opacity
            >
              <span className="text-sm font-bold opacity-50 mb-6 font-display" style={{ color: '#17233C' }}>
                {item.number}
              </span>
              <h3 className="font-display text-xl font-semibold text-[#17233C] mb-3">
                {item.name}
              </h3>
              <p className="text-gray-600 mt-auto leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
          
          {/* "And more" card taking up the last slot if needed, or we just rely on grid packing */}
        </div>

        {/* Additional Items List */}
        <div className="bg-[#FFF9F1] rounded-3xl p-8 md:p-12 mb-16 border border-gray-100">
          <h3 className="font-display text-lg font-semibold text-[#17233C] mb-8 text-center md:text-left">
            Plus these additional tools & guides:
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
            {WHATS_INCLUDED.additional.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#FF826E] shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <PurchaseButton location="product" className="px-10 py-5 text-lg" />
        </div>
      </div>
    </section>
  );
}
