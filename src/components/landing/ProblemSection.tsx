"use client";

import { motion } from "framer-motion";
import { PROBLEM } from "@/content/landing";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export function ProblemSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#17233C] mb-6">
            {PROBLEM.headline}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed text-pretty">
            {PROBLEM.body}
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {PROBLEM.cards.map((card, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              className="bg-[#FFF9F1] rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-6">{card.icon}</div>
              <h3 className="font-display text-xl font-semibold text-[#17233C] mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="inline-block bg-[#DDE8D5]/30 text-[#17233C] px-6 py-3 rounded-full font-semibold">
            {PROBLEM.close}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
