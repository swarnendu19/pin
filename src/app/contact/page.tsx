import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { PRODUCT } from "@/config/product";

export const metadata = {
  title: "Contact Support | College Move-In Kit",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F1]">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 text-center">
            
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#17233C] mb-6">
              Contact Support
            </h1>
            
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Have a question about the College Move-In Kit or need help with a purchase? We're here to help.
            </p>

            <a 
              href={`mailto:${PRODUCT.supportEmail}`}
              className="inline-flex items-center justify-center bg-[#17233C] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1e2f50] transition-colors"
            >
              Email {PRODUCT.supportEmail}
            </a>

            <p className="text-sm text-gray-500 mt-8">
              We typically respond within 1-2 business days.
            </p>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
