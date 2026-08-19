"use client";

import { motion } from "framer-motion";
import { BUY_BRING_SKIP } from "@/content/landing";

export function BuyBringSkip() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#17233C] mb-6">
            {BUY_BRING_SKIP.headline}
          </h2>
          <p className="text-lg text-gray-600">
            {BUY_BRING_SKIP.subheadline}
          </p>
        </div>

        <div className="bg-[#FFF9F1] rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/40">
          <div className="grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 px-4 hidden sm:grid">
            <div className="col-span-8">Item</div>
            <div className="col-span-4 text-right">Status</div>
          </div>
          
          <div className="space-y-3">
            {BUY_BRING_SKIP.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="grid sm:grid-cols-12 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="sm:col-span-8 font-medium text-[#17233C] mb-2 sm:mb-0">
                  {item.name}
                </div>
                <div className="sm:col-span-4 flex sm:justify-end">
                  <span 
                    className="px-3 py-1 text-xs font-bold rounded-full"
                    style={{ backgroundColor: item.color, color: "#17233C" }}
                  >
                    {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
