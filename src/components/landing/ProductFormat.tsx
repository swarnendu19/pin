"use client";

import { PRODUCT_FORMAT } from "@/content/landing";

export function ProductFormat() {
  return (
    <section className="py-20 bg-[#FFF9F1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#17233C]">
            {PRODUCT_FORMAT.headline}
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PRODUCT_FORMAT.formats.map((format, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="text-3xl mb-4">{format.icon}</div>
              <h3 className="font-display font-semibold text-[#17233C] mb-2">{format.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{format.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 max-w-2xl mx-auto">
          {PRODUCT_FORMAT.compatibility}
        </p>

      </div>
    </section>
  );
}
