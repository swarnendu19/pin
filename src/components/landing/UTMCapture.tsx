"use client";

import { useEffect } from "react";
import { captureUTM } from "@/lib/utm";

/** Captures UTM params from URL into sessionStorage/localStorage on mount. */
export function UTMCapture() {
  useEffect(() => {
    captureUTM();
  }, []);

  return null;
}
