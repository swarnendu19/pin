import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { LEGAL } from "@/content/legal";

export const metadata = {
  title: "Terms of Service | College Move-In Kit",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#17233C] mb-4">
            {LEGAL.terms.title}
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: {LEGAL.effectiveDate}
          </p>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-10">
              {LEGAL.terms.intro}
            </p>

            <div className="space-y-8">
              {LEGAL.terms.sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="font-display text-xl font-semibold text-[#17233C] mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
