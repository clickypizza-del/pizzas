"use client";

import { useEffect, useRef, useState } from "react";

interface GoogleAdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

const ADSENSE_CLIENT = "ca-pub-6697921053683954";

export function GoogleAd({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: GoogleAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const hasAttemptedLoad = useRef(false);

  useEffect(() => {
    // Solo intentar una vez
    if (hasAttemptedLoad.current || loaded) return;
    hasAttemptedLoad.current = true;

    const attemptLoad = () => {
      try {
        if (!window.adsbygoogle) {
          // Agendamos el próximo intento si AdSense no está disponible
          setTimeout(attemptLoad, 100);
          return;
        }

        window.adsbygoogle.push({});
        setLoaded(true);
      } catch {
        // Reintentar en 1 segundo
        setTimeout(attemptLoad, 1000);
      }
    };

    // Intentar carga inmediata
    attemptLoad();
  }, [loaded]);

  return (
    <div className={`flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
