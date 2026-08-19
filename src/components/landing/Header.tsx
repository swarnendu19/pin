"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PurchaseButton } from "@/components/checkout/PurchaseButton";
import { PRODUCT } from "@/config/product";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#whats-included", label: "What's Inside" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#FFF9F1]/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#17233C] flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="5" height="5" rx="1" fill="#FFD66B" />
                  <rect x="9" y="2" width="5" height="5" rx="1" fill="#DCEBFF" />
                  <rect x="2" y="9" width="5" height="5" rx="1" fill="#DDE8D5" />
                  <rect x="9" y="9" width="5" height="5" rx="1" fill="#FF826E" />
                </svg>
              </div>
              <div>
                <span className="font-display font-semibold text-[#17233C] text-sm leading-tight block">
                  Move-In Kit
                </span>
                <span className="text-[10px] text-gray-400 leading-tight block hidden sm:block">
                  2026–27
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#17233C] rounded-full hover:bg-white/60 transition-all duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <PurchaseButton
                label={`Get the Kit — ${PRODUCT.priceDisplay}`}
                location="hero"
                className="px-5 py-2.5 text-sm rounded-full"
              />
            </div>

            {/* Mobile: Logo + CTA + Menu toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <PurchaseButton
                label={`Get the Kit — ${PRODUCT.priceDisplay}`}
                location="hero"
                className="px-4 py-2 text-xs rounded-full"
              />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-[#17233C]" />
                ) : (
                  <Menu className="w-4 h-4 text-[#17233C]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FFF9F1]/98 backdrop-blur-md border-b border-gray-100">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#17233C] hover:bg-white rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
