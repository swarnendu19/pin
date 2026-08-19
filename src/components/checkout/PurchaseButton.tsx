"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { initiateCheckout } from "@/lib/dodo";
import { analytics } from "@/lib/analytics";
import { getAttribution } from "@/lib/utm";
import { PRODUCT } from "@/config/product";

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

/**
 * Centralized purchase button.
 * ALL checkout initiation flows through here.
 *
 * Handles:
 * 1. Analytics event
 * 2. Dodo checkout initiation
 * 3. Duplicate-click prevention
 * 4. Loading feedback
 * 5. Error handling
 * 6. UTM attribution preservation
 */
export function PurchaseButton({
  label,
  location = "hero",
  className,
  variant = "primary",
  fullWidth = false,
}: PurchaseButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Display label based on product config
  const displayLabel = label ?? `Get The Complete Kit — ${PRODUCT.priceDisplay}`;

  async function handleClick() {
    if (isLoading || !PRODUCT.checkoutEnabled) return;

    setIsLoading(true);
    setError(null);

    // 1. Track CTA click
    analytics.ctaClick(location);
    analytics.checkoutStarted();

    // 2. Capture attribution for metadata
    const attribution = getAttribution();

    // 3. Initiate checkout
    const result = await initiateCheckout({
      metadata: attribution
        ? Object.fromEntries(
            Object.entries(attribution).filter(([, v]) => v !== undefined)
          ) as Record<string, string>
        : {},
    });

    if (result.success && result.checkoutUrl) {
      // Redirect to Dodo hosted checkout
      window.location.href = result.checkoutUrl;
    } else {
      setIsLoading(false);
      setError(result.error ?? "Something went wrong. Please try again.");
    }
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
        disabled={isLoading || !PRODUCT.checkoutEnabled}
        aria-label={isLoading ? "Opening checkout…" : displayLabel}
        className={cn(
          baseStyles,
          variantStyles[variant],
          fullWidth && "w-full",
          className
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Opening checkout…</span>
          </>
        ) : (
          <span>{displayLabel}</span>
        )}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-2 text-sm text-red-600 text-center max-w-xs"
        >
          {error}
        </p>
      )}

      {!PRODUCT.checkoutEnabled && (
        <p className="mt-2 text-sm text-gray-500 text-center">
          Checkout coming soon.
        </p>
      )}
    </div>
  );
}
