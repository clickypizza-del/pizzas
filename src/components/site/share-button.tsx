"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

type ShareButtonProps = {
  title: string;
  text: string;
  url?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  label?: string;
};

export function ShareButton({
  title,
  text,
  url,
  variant = "outline",
  size = "sm",
  className = "",
  label = "Compartir",
}: ShareButtonProps) {
  const shareUrl = url ?? `${SITE.shareUrl ?? "https://clickypizza.com.ar"}`;

  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: shareUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or API not really available — fall through
      }
    }

    const waText = `${text} ${shareUrl}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(waText)}`,
      "_blank",
    );
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleShare}
    >
      <Share2 className="size-4" />
      {size !== "icon" ? label : null}
    </Button>
  );
}
