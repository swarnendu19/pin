import Link from "next/link";
import { PRODUCT } from "@/config/product";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="font-display font-semibold text-[#17233C] text-lg mb-1">
              {PRODUCT.shortName}
            </div>
            <div className="text-sm text-gray-400">
              {PRODUCT.tagline}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-500">
            <Link href="/privacy" className="hover:text-[#17233C] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#17233C] transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-[#17233C] transition-colors">Refund Policy</Link>
            <Link href="/contact" className="hover:text-[#17233C] transition-colors">Contact</Link>
          </div>

          <div>
            <a href={`mailto:${PRODUCT.supportEmail}`} className="text-sm text-[#FF826E] font-medium hover:underline">
              {PRODUCT.supportEmail}
            </a>
          </div>

        </div>

        <div className="text-center md:text-left text-xs text-gray-400 border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <div>
            &copy; {currentYear} {PRODUCT.businessLegalName}. All rights reserved.
          </div>
          <div className="max-w-md">
            This product is not affiliated with any specific college or university. Always verify dorm dimensions, included furniture, and housing policies with your school before purchasing physical items.
          </div>
        </div>

      </div>
    </footer>
  );
}
