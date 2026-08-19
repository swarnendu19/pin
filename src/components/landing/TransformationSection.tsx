"use client";

import { motion } from "framer-motion";
import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
import { TRANSFORMATION } from "@/content/landing";

export function TransformationSection() {
  return (
    <section className="py-24 bg-[#FFF9F1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#17233C]">
            {TRANSFORMATION.headline}
          </h2>
        </div>

        <div className="relative grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Divider/Arrow (hidden on mobile, visible on md+) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border border-gray-100 z-10">
            <ArrowRight className="w-5 h-5 text-[#17233C]" />
          </div>

          {/* BEFORE */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-10" />
            <h3 className="text-sm font-semibold text-red-500 uppercase tracking-widest mb-8">Before</h3>
            <ul className="space-y-5">
              {TRANSFORMATION.before.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600">
                  <XCircle className="w-5 h-5 text-red-300 shrink-0" />
                  <span className="line-through decoration-red-200/50">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AFTER */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#17233C] rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden text-white"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#DCEBFF]/10 rounded-bl-full -z-10" />
            <h3 className="text-sm font-semibold text-[#DDE8D5] uppercase tracking-widest mb-8">After</h3>
            <ul className="space-y-5">
              {TRANSFORMATION.after.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-[#DDE8D5] shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
