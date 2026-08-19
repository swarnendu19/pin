"use client";

import { useEffect, useRef } from "react";
import { analytics } from "@/lib/analytics";
import Link from "next/link";
import { CheckCircle, Mail, Download, ListTodo } from "lucide-react";

export function SuccessContent({ isVerified, transactionId }: { isVerified: boolean, transactionId?: string }) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (isVerified && transactionId && !hasTracked.current) {
      analytics.purchase(transactionId);
      hasTracked.current = true;
    }
  }, [isVerified, transactionId]);

  return (
    <div className="bg-white max-w-2xl w-full rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <h1 className="font-display text-3xl md:text-5xl font-semibold text-[#17233C] mb-4">
        You're Move-In Ready. 🎓
      </h1>
      
      <p className="text-lg text-gray-600 mb-10">
        Your College Move-In Money Saver Kit is yours.
      </p>

      <div className="bg-[#FFF9F1] rounded-2xl p-6 mb-8 text-left border border-gray-100">
        <h3 className="font-semibold text-[#17233C] flex items-center gap-2 mb-3">
          <Mail className="w-5 h-5 text-[#FF826E]" />
          Check your email
        </h3>
        <p className="text-gray-600 mb-0">
          Your purchase confirmation and digital access information have been sent to the email address you provided at checkout.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left border border-gray-100">
        <h3 className="font-semibold text-[#17233C] flex items-center gap-2 mb-4">
          <ListTodo className="w-5 h-5 text-[#DCEBFF] fill-[#17233C]" />
          Start here first
        </h3>
        <ol className="space-y-3 text-gray-600 list-decimal list-inside marker:font-semibold marker:text-[#17233C]">
          <li>Open <strong className="font-medium">START-HERE.pdf</strong></li>
          <li>Check your dorm rules and dimensions</li>
          <li>Complete your packing inventory</li>
          <li>Set your dorm budget</li>
          <li>Coordinate shared items with your roommate</li>
        </ol>
      </div>

      <div className="text-sm text-gray-500 mb-8 border-t border-gray-100 pt-8">
        <p className="font-medium text-gray-700 mb-1">Didn't receive your email?</p>
        <p>Check your spam or promotions folder. If it's still missing after 10 minutes, please <Link href="/contact" className="text-[#FF826E] hover:underline">contact support</Link>.</p>
      </div>

      <Link href="/" className="inline-block font-medium text-[#17233C] hover:underline">
        Return to home page
      </Link>
    </div>
  );
}
