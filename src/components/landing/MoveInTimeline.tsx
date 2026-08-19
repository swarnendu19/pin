"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "@/content/landing";

export function MoveInTimeline() {
  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#17233C]">
            Your Complete System
          </h2>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Track line */}
          <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-100 -z-10" />
          
          <div className="grid grid-cols-6 gap-4">
            {TIMELINE.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Dot */}
                <div 
                  className="w-8 h-8 rounded-full border-4 border-white shadow-sm mb-6 flex-shrink-0"
                  style={{ backgroundColor: step.color === "#FFF9F1" ? "#17233C" : step.color }}
                />
                
                <h3 className="text-sm font-bold text-[#17233C] mb-2 uppercase tracking-wide">
                  {step.time}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-[150px]">
                  {step.action}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden relative pl-6 max-w-sm mx-auto">
          {/* Track line */}
          <div className="absolute top-0 bottom-0 left-9 w-[2px] bg-gray-100 -z-10" />
          
          <div className="space-y-12">
            {TIMELINE.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative flex gap-6"
              >
                {/* Dot */}
                <div 
                  className="w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0 mt-1"
                  style={{ backgroundColor: step.color === "#FFF9F1" ? "#17233C" : step.color }}
                />
                
                <div>
                  <h3 className="text-sm font-bold text-[#17233C] mb-1 uppercase tracking-wide">
                    {step.time}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {step.action}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
