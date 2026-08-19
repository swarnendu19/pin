"use client";

import { motion } from "framer-motion";
import { SOCIAL_PROOF } from "@/content/landing";
import { testimonials } from "@/data/testimonials";
import { MessageSquareQuote } from "lucide-react";

export function SocialProof() {
  const hasTestimonials = testimonials && testimonials.length > 0;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#17233C]">
            {hasTestimonials ? "What students and parents say." : SOCIAL_PROOF.headline}
          </h2>
        </div>

        {!hasTestimonials ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOCIAL_PROOF.questions.map((q, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#FFF9F1] rounded-2xl p-6 shadow-sm border border-[#17233C]/5"
              >
                <div className="flex gap-3">
                  <MessageSquareQuote className="w-5 h-5 text-[#DCEBFF] shrink-0 fill-[#17233C]" />
                  <p className="text-[#17233C] font-medium leading-relaxed italic">
                    "{q}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-[#FFF9F1] rounded-2xl p-6 shadow-sm border border-[#17233C]/5">
                <div className="flex gap-1 text-[#FFD66B] mb-4 text-sm">
                  ★★★★★
                </div>
                <p className="text-[#17233C] leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="font-semibold text-sm text-[#17233C]">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.descriptor}</div>
                  {t.verified && <div className="text-[10px] text-green-600 font-medium mt-1 uppercase tracking-wide">Verified Purchase</div>}
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}
