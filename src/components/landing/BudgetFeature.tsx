"use client";

import { motion } from "framer-motion";
import { BUDGET_FEATURE } from "@/content/landing";
import { PurchaseButton } from "@/components/checkout/PurchaseButton";

export function BudgetFeature() {
  return (
    <section className="py-24 bg-[#DDE8D5]/15 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#17233C] mb-6 leading-tight">
              {BUDGET_FEATURE.headline}
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              {BUDGET_FEATURE.body}
            </p>
            <PurchaseButton 
              label={BUDGET_FEATURE.cta}
              location="product" 
              className="w-full sm:w-auto"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Dashboard Mockup */}
            <div className="bg-[#17233C] rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto border border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div className="text-white/60 text-xs font-semibold tracking-widest uppercase">
                  Budget Calculator
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
              </div>

              <div className="mb-8">
                <div className="text-white/50 text-sm mb-1">Total Budget</div>
                <div className="text-5xl font-display font-semibold text-white">
                  {BUDGET_FEATURE.stats.budget}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="text-[#DCEBFF] text-xs font-medium mb-1">Planned</div>
                  <div className="text-2xl font-display font-semibold text-white">{BUDGET_FEATURE.stats.planned}</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="text-[#FF826E] text-xs font-medium mb-1">Spent So Far</div>
                  <div className="text-2xl font-display font-semibold text-white">{BUDGET_FEATURE.stats.spent}</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70 font-medium">Remaining</span>
                  <span className="text-[#DDE8D5] font-semibold">{BUDGET_FEATURE.stats.remaining}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "51%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-[#FFD66B] rounded-full"
                  />
                </div>
              </div>

              {/* Breakdown */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Already Owned</span>
                  <span className="text-white font-medium">{BUDGET_FEATURE.stats.alreadyOwned}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Roommate Bringing</span>
                  <span className="text-white font-medium">{BUDGET_FEATURE.stats.roommateBringing}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Need to Buy</span>
                  <span className="text-[#DCEBFF] font-medium">{BUDGET_FEATURE.stats.needToBuy}</span>
                </div>
              </div>
            </div>

            {/* Decorative blur behind mockup */}
            <div className="absolute -inset-4 bg-[#DCEBFF]/40 blur-3xl -z-10 rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
