"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (command: string, id: string, config?: Record<string, unknown>) => void;
  }
}

export default function GAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GA_ID;
    if (!id || typeof window === "undefined" || typeof window.gtag !== "function") return;

    const qs = searchParams?.toString();
    const page_path = (qs ? `${pathname}?${qs}` : pathname) || "/";

    // Esto evita duplicar el primer page_view: lo envía el tag en la carga inicial
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    window.gtag("config", id, { page_path });
  }, [pathname, searchParams]);

  return null;
}
