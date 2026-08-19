"use client";

import { useEffect } from "react";
import { captureUTM } from "@/lib/utm";
import { analytics } from "@/lib/analytics";
import { usePathname } from "next/navigation";

export default function UTMCapture() {
  const pathname = usePathname();

  useEffect(() => {
    // Capture UTM parameters if present
    captureUTM();
  }, []);

  useEffect(() => {
    // Fire page view on route change
    analytics.pageView(window.location.href);
  }, [pathname]);

  return null; // Component does not render anything
}
