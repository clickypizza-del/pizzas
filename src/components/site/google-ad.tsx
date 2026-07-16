"use client";

import { useEffect, useRef, useState } from "react";

interface GoogleAdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export function GoogleAd({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: GoogleAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    try {
      // @ts-expect-error adsbygoogle is a global from AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setLoaded(true);
    } catch {
      // AdSense not loaded yet
    }
  }, [loaded]);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  if (!publisherId) return null;

  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
