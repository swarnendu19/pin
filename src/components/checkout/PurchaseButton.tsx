"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { initiateCheckout } from "@/lib/dodo";
import { analytics } from "@/lib/analytics";
import { getAttribution } from "@/lib/utm";
import { PRODUCT } from "@/config/product";

import { CheckoutModal } from "./CheckoutModal";

type CTALocation = "hero" | "product" | "parent" | "final" | "sticky";

interface PurchaseButtonProps {
  /** Button label — can vary while checkout behavior stays centralized */
  label?: string;
  /** Where on the page this button lives — for analytics */
  location?: CTALocation;
  /** Additional CSS classes */
  className?: string;
  /** Visual variant */
  variant?: "primary" | "secondary" | "ghost";
  /** Full-width block button */
  fullWidth?: boolean;
}

export function PurchaseButton({
  label,
  location = "hero",
  className,
  variant = "primary",
  fullWidth = false,
}: PurchaseButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Display label based on product config
  const displayLabel = label ?? `Get The Complete Kit — ${PRODUCT.priceDisplay}`;

  function handleClick() {
    if (!PRODUCT.checkoutEnabled) return;
    analytics.ctaClick(location);
    setIsModalOpen(true);
  }

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed select-none";

  const variantStyles = {
    primary:
      "bg-[#17233C] text-white hover:bg-[#1e2f50] focus-visible:ring-[#17233C] shadow-lg shadow-navy/20 hover:shadow-xl hover:shadow-navy/30 px-8 py-4 text-base",
    secondary:
      "bg-[#FF826E] text-white hover:bg-[#f06d5a] focus-visible:ring-[#FF826E] shadow-lg shadow-coral/20 hover:shadow-xl hover:shadow-coral/30 px-8 py-4 text-base",
    ghost:
      "bg-transparent text-[#17233C] border-2 border-[#17233C] hover:bg-[#17233C] hover:text-white focus-visible:ring-[#17233C] px-8 py-4 text-base",
  };

  return (
    <div className={cn("flex flex-col items-center", fullWidth && "w-full")}>
      <button
        onClick={handleClick}
        disabled={!PRODUCT.checkoutEnabled}
        aria-label={displayLabel}
        className={cn(
          baseStyles,
          variantStyles[variant],
          fullWidth && "w-full",
          className
        )}
      >
        <span>{displayLabel}</span>
      </button>

      {!PRODUCT.checkoutEnabled && (
        <p className="mt-2 text-sm text-gray-500 text-center">
          Checkout coming soon.
        </p>
      )}

      {/* Render modal unconditionally in React tree, it uses AnimatePresence internally */}
      <CheckoutModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        location={location}
      />
    </div>
  );
}
