"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag: (command: string, id: string, config: { page_path: string }) => void;
  }
}

export default function GAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GA_ID;
    if (!id) return;
    const qs = searchParams?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname || "/";
    if (typeof window !== "undefined" && "gtag" in window) {
      window.gtag("config", id, { page_path });
    }
  }, [pathname, searchParams]);

  return null;
}
