"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

export default function GtmPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && document.title){
    sendGTMEvent({
      event: "page_view",
      page_path: pathname || "/",
      page_location: window.location.href,
      page_title: document.title,
    });
  }
  }, [pathname, searchParams]);

  return null;
}
