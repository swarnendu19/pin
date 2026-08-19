"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, Zap } from "lucide-react";
import { PurchaseButton } from "@/components/checkout/PurchaseButton";
import { analytics } from "@/lib/analytics";
import { HERO } from "@/content/landing";
import { PRODUCT } from "@/config/product";

const chips = HERO.chips;

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HeroSection() {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      analytics.viewProduct();
      hasTracked.current = true;
    }
  }, []);

  const headline =
    PRODUCT.heroVariant === "B" ? HERO.headlineB : HERO.headlineA;

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#FFF9F1]">
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, #DCEBFF33 0%, transparent 60%),
            radial-gradient(circle at 75% 80%, #DDE8D522 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: Copy ── */}
          <div className="flex flex-col items-start">
            {/* Eyebrow */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#17233C]/60 uppercase mb-6">
                <span
                  className="w-4 h-0.5 bg-[#FF826E] rounded-full"
                  aria-hidden="true"
                />
                {HERO.eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="font-display text-[2.6rem] sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] text-[#17233C] mb-5 text-balance"
            >
              {headline.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <>
                      <span className="relative inline-block">
                        {line.split(" ").slice(0, -2).join(" ")}{" "}
                        <span className="text-[#FF826E]">
                          {line.split(" ").slice(-2).join(" ")}
                        </span>
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
              className="text-base md:text-lg text-gray-600 leading-relaxed mb-7 max-w-md"
            >
              {HERO.subheadline}
            </motion.p>

            {/* Benefit chips */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeUp}
              className="flex flex-wrap gap-2 mb-8"
              aria-label="Kit features"
            >
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-[#17233C] shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17233C]" aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={4}
              variants={fadeUp}
              className="flex flex-col items-start gap-3 w-full sm:w-auto"
            >
              <PurchaseButton
                label={HERO.ctaPrimary}
                location="hero"
                className="text-base px-8 py-4 rounded-full font-semibold shadow-xl shadow-navy/20 hover:shadow-2xl hover:shadow-navy/30"
              />
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#17233C]/50" aria-hidden="true" />
                {HERO.microcopy}
              </p>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={5}
              variants={fadeUp}
              className="mt-5 text-sm text-gray-500"
            >
              {HERO.trustLine}
            </motion.p>
          </div>

          {/* ── Right: Product Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
            aria-hidden="true"
          >
            <HeroProductMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Premium layered product mockup */
function HeroProductMockup() {
  return (
    <div className="relative w-full max-w-[500px] h-[420px] md:h-[500px]">
      {/* Background card — Budget Dashboard */}
      <div
        className="absolute right-0 top-4 w-[88%] rounded-2xl bg-[#17233C] p-5 shadow-2xl"
        style={{ zIndex: 1 }}
      >
        <div className="text-white/60 text-xs font-medium mb-3 tracking-wide">
          DORM BUDGET DASHBOARD
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Budget", value: "$1,200", color: "#FFD66B" },
            { label: "Planned", value: "$846", color: "#DCEBFF" },
            { label: "Spent So Far", value: "$614", color: "#FF826E" },
            { label: "Remaining", value: "$586", color: "#DDE8D5" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-xl p-3">
              <div
                className="text-xs font-medium mb-1"
                style={{ color: stat.color }}
              >
                {stat.label}
              </div>
              <div className="text-white font-display text-xl font-semibold">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
        {/* Budget bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-white/50 mb-1">
            <span>Budget used</span>
            <span>51%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFD66B] rounded-full"
              style={{ width: "51%" }}
            />
          </div>
        </div>
      </div>

      {/* Middle card — Packing List */}
      <div
        className="absolute left-0 top-[120px] w-[72%] rounded-2xl bg-white border border-gray-100 p-4 shadow-xl"
        style={{ zIndex: 2 }}
      >
        <div className="text-[#17233C]/50 text-[10px] font-semibold tracking-wide uppercase mb-3">
          Packing List
        </div>
        {[
          { item: "Twin XL Sheets", status: "Bring", color: "#DDE8D5" },
          { item: "Desk Lamp", status: "Buy", color: "#DCEBFF" },
          { item: "Mini Fridge", status: "Roommate", color: "#FFD66B" },
          { item: "Shower Caddy", status: "Buy", color: "#DCEBFF" },
          { item: "Laundry Bag", status: "Bring", color: "#DDE8D5" },
        ].map((row) => (
          <div
            key={row.item}
            className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0"
          >
            <span className="text-xs text-[#17233C] font-medium">{row.item}</span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: row.color, color: "#17233C" }}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>

      {/* Top-right card — Quick stats */}
      <div
        className="absolute right-4 top-[260px] w-[48%] rounded-2xl bg-[#FFF9F1] border border-gray-200 p-4 shadow-lg"
        style={{ zIndex: 3 }}
      >
        <div className="text-[10px] font-semibold text-[#17233C]/50 uppercase tracking-wide mb-3">
          Items Sorted
        </div>
        {[
          { label: "Already Own", count: 47, color: "#DDE8D5" },
          { label: "Need to Buy", count: 36, color: "#DCEBFF" },
          { label: "Roommate's", count: 14, color: "#FFD66B" },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-2 mb-2 last:mb-0">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: row.color, border: "1.5px solid #17233C22" }}
            />
            <span className="text-xs text-gray-500 flex-1">{row.label}</span>
            <span className="text-xs font-semibold text-[#17233C]">
              {row.count}
            </span>
          </div>
        ))}
      </div>

      {/* Badge — floating */}
      <div
        className="absolute left-4 bottom-0 flex items-center gap-2 bg-[#FF826E] text-white rounded-full px-4 py-2.5 shadow-lg"
        style={{ zIndex: 4 }}
      >
        <Zap className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
        <span className="text-xs font-semibold">18 tools included</span>
      </div>
    </div>
  );
}
