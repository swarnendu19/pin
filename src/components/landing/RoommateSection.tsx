"use client";

import { motion } from "framer-motion";
import { ROOMMATE } from "@/content/landing";

export function RoommateSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#DCEBFF]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 md:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 relative"
            >
              {/* Avatars */}
              <div className="flex justify-center -mt-12 mb-8">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-[#17233C] text-white flex items-center justify-center font-display font-semibold text-xl border-4 border-white z-10 shadow-sm">
                    M
                  </div>
                  <div className="w-14 h-14 rounded-full bg-[#FF826E] text-white flex items-center justify-center font-display font-semibold text-xl border-4 border-white -ml-4 z-20 shadow-sm">
                    J
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {ROOMMATE.items.map((row, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-medium text-[#17233C]">{row.item}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium">{row.assignee}</span>
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                        style={{ 
                          backgroundColor: row.assignee === "Split" ? "#FFD66B" : (row.initial === "M" ? "#17233C" : "#FF826E"),
                          color: row.assignee === "Split" ? "#17233C" : "white"
                        }}
                      >
                        {row.initial}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="order-1 md:order-2">
            <span className="inline-block text-xs font-bold text-[#FF826E] tracking-widest uppercase mb-4">
              {ROOMMATE.eyebrow}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#17233C] mb-6 leading-tight">
              {ROOMMATE.headline}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {ROOMMATE.body}
            </p>
            <p className="text-xs text-gray-400 leading-normal max-w-sm">
              {ROOMMATE.disclaimer}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
