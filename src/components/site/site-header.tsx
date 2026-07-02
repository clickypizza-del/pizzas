"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS, SITE } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/icons";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        "bg-background/85 backdrop-blur-xl border-b border-border",
        scrolled ? "shadow-xl shadow-black/50" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
      >
        Saltar al contenido
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-28">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label={`${SITE.name} — inicio`}
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 bg-primary/30 rounded-full blur-xl group-hover:bg-primary/50 transition-colors duration-500"
              />
              <Image
                src={SITE.logoUrl}
                alt={`${SITE.name} logo`}
                width={80}
                height={80}
                className={cn(
                  "relative object-contain transition-all duration-300",
                  "h-12 w-12 sm:h-14 sm:w-14 lg:h-20 lg:w-20",
                  "drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]",
                  "group-hover:drop-shadow-[0_0_24px_rgba(255,255,255,0.8)]",
                  "group-hover:scale-105",
                )}
                priority
              />
            </div>
            <span className="font-brand text-3xl lg:text-4xl text-foreground leading-none tracking-wide">
              Click<span className="text-primary">&</span>Pizza
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Navegación principal"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    "after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2",
                    "after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-300",
                    active
                      ? "text-primary after:w-5"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 after:w-0 hover:after:w-4",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all"
            >
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-4" />
                Hacer pedido
              </a>
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground size-12 bg-secondary/50 hover:bg-secondary"
                  aria-label="Abrir menú de navegación"
                  aria-expanded={mobileOpen}
                >
                  <Menu className="size-7" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[82%] max-w-sm bg-background border-l-border overflow-y-auto"
              >
                <SheetHeader className="px-6 pt-6">
                  <SheetTitle className="flex items-center gap-3">
                    <Image
                      src={SITE.logoUrl}
                      alt={`${SITE.name} logo`}
                      width={56}
                      height={56}
                      className="h-12 w-12 object-contain"
                    />
                    <span className="font-brand text-3xl text-foreground">
                      Click<span className="text-primary">&</span>Pizza
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav
                  className="flex flex-col gap-0.5 px-4 mt-2"
                  aria-label="Navegación móvil"
                >
                  <MobileNavItems onClose={() => setMobileOpen(false)} />
                </nav>
                <div className="mt-auto p-6">
                  <SheetClose asChild>
                    <Button
                      asChild
                      size="lg"
                      className="w-full rounded-full"
                    >
                      <a
                        href={buildWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon className="size-4" />
                        Hacer pedido
                      </a>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNavItems({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
        return (
          <SheetClose asChild key={item.href}>
            <Link
              href={item.href}
              onClick={onClose}
              className={cn(
                "px-4 py-3.5 text-base font-medium rounded-lg transition-colors",
                active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
              )}
            >
              {item.label}
            </Link>
          </SheetClose>
        );
      })}
    </>
  );
}
