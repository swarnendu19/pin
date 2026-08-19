"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, CheckCircle2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { initiateCheckout } from "@/lib/dodo";
import { analytics } from "@/lib/analytics";
import { getAttribution } from "@/lib/utm";
import { PRODUCT } from "@/config/product";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
}

export function CheckoutModal({ isOpen, onClose, location }: CheckoutModalProps) {
  const [bumpAccepted, setBumpAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset state on close
      setBumpAccepted(false);
      setError(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  async function handleCheckout() {
    setIsLoading(true);
    setError(null);

    analytics.checkoutStarted();

    const attribution = getAttribution();

    const result = await initiateCheckout({
      metadata: attribution
        ? (Object.fromEntries(
            Object.entries(attribution).filter(([, v]) => v !== undefined)
          ) as Record<string, string>)
        : {},
      bumpAccepted, // We'll update the dodo helper to accept this
    } as any);

    if (result.success && result.checkoutUrl) {
      window.location.href = result.checkoutUrl;
    } else {
      setIsLoading(false);
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  const bumpInclusions = [
    "First 30 Days Checklist",
    "Weekly Student Budget Tracker",
    "Meal & Grocery Planner",
    "Study Setup Planner",
    "Class Schedule Organizer",
    "Campus Essentials Checklist",
    "Laundry + Cleaning Routine",
    "New Roommate Communication Guide",
    "Social / Clubs / Orientation Planner",
    "First-Month Expense Tracker",
    "Important Campus Contacts Sheet",
    "“Things to do in your first week” quick guide",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#17233C]/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-[#FFF9F1]">
                <h2 className="font-display font-semibold text-xl text-[#17233C]">
                  Complete Your Order
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-gray-400 hover:text-[#17233C] transition-colors rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 flex-1">
                {/* Main Product Summary */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-semibold text-[#17233C] text-lg">
                      {PRODUCT.productName}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Digital Download • Instant Access
                    </p>
                  </div>
                  <div className="font-display font-semibold text-xl text-[#17233C]">
                    {PRODUCT.priceDisplay}
                  </div>
                </div>

                {/* Bump Offer */}
                <div
                  className={cn(
                    "rounded-2xl border-2 transition-colors duration-200 overflow-hidden",
                    bumpAccepted
                      ? "border-[#17233C] bg-[#F8FAFC]"
                      : "border-dashed border-gray-200 bg-white hover:border-[#17233C]/30"
                  )}
                >
                  {/* Bump Header (Clickable) */}
                  <div
                    className="p-5 flex items-start gap-4 cursor-pointer"
                    onClick={() => setBumpAccepted(!bumpAccepted)}
                  >
                    <div className="pt-1 flex-shrink-0">
                      <div
                        className={cn(
                          "w-6 h-6 rounded border flex items-center justify-center transition-colors",
                          bumpAccepted
                            ? "bg-[#17233C] border-[#17233C] text-white"
                            : "border-gray-300 bg-white text-transparent"
                        )}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#FF826E] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                          One-Time Offer
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-[#17233C] text-lg">
                        Add the Freshman First 30 Days Survival Pack for just $7
                      </h4>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        Move-in is only day one. Get the planners and checklists that help you stay organized through your first month of college.
                      </p>
                    </div>
                    <div className="font-display font-semibold text-lg text-[#17233C] whitespace-nowrap">
                      + $7.00
                    </div>
                  </div>

                  {/* Expandable details when checked (or we can just show them always nicely) */}
                  <div className="px-5 pb-5 pl-14">
                    <p className="text-xs font-semibold text-[#17233C]/60 uppercase tracking-widest mb-3">
                      Includes 12 essential tools:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      {bumpInclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <Plus className="w-3.5 h-3.5 text-[#FFD66B] flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer / Total */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Total due today</span>
                  <span className="font-display font-bold text-3xl text-[#17233C]">
                    ${PRODUCT.price + (bumpAccepted ? 7 : 0)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#17233C] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#1e2f50] transition-colors shadow-lg shadow-navy/10 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </button>

                {error && (
                  <p className="mt-3 text-sm text-red-600 text-center font-medium">
                    {error}
                  </p>
                )}
                <p className="mt-4 text-xs text-center text-gray-400">
                  Secure checkout via Dodo Payments.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
