"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NAV_ITEMS,
  NAV_LINKS,
  isNavGroup,
  SITE,
} from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/icons";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  }, []);

  useEffect(() => {
    if (openDropdown) {
      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openDropdown]);

  const isActiveLink = (href: string) => {
    const id = href.startsWith("#") ? href.slice(1) : null;
    return id === activeId;
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
            href="#top"
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

          {/* Desktop nav with dropdowns */}
          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-0.5"
            aria-label="Navegación principal"
          >
            {NAV_ITEMS.map((item) => {
              if (isNavGroup(item)) {
                const isOpen = openDropdown === item.label;
                const hasActive = item.items.some((i) => isActiveLink(i.href));
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(isOpen ? null : item.label)
                      }
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1",
                        "after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2",
                        "after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-300",
                        hasActive
                          ? "text-primary after:w-5"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 after:w-0 hover:after:w-4",
                      )}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          isOpen ? "rotate-180" : "",
                        )}
                        aria-hidden
                      />
                    </button>

                    <div
                      className={cn(
                        "absolute top-full left-0 mt-2 min-w-[200px] bg-card border border-border rounded-xl shadow-xl shadow-black/30 p-2 transition-all duration-200 origin-top-left",
                        isOpen
                          ? "opacity-100 scale-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none",
                      )}
                      role="menu"
                    >
                      {item.items.map((sub) => {
                        const active = isActiveLink(sub.href);
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            className={cn(
                              "block px-4 py-2.5 text-sm rounded-lg transition-colors duration-150",
                              active
                                ? "text-primary bg-primary/10 font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                            )}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    "after:absolute after:bottom-0.5 after:left-1/2 after:-translate-x-1/2",
                    "after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-300",
                    isActive
                      ? "text-primary after:w-5"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 after:w-0 hover:after:w-4",
                  )}
                  aria-current={isActive ? "page" : undefined}
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
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {NAV_ITEMS.map((item) => {
        if (isNavGroup(item)) {
          const isExpanded = expanded === item.label;
          return (
            <div key={item.label}>
              <button
                type="button"
                onClick={() =>
                  setExpanded(isExpanded ? null : item.label)
                }
                className="w-full flex items-center justify-between px-4 py-3.5 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-lg transition-colors"
                aria-expanded={isExpanded}
              >
                {item.label}
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform duration-200",
                    isExpanded ? "rotate-180" : "",
                  )}
                  aria-hidden
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="pl-4 pb-1 space-y-0.5">
                  {item.items.map((sub) => (
                    <SheetClose asChild key={sub.href}>
                      <Link
                        href={sub.href}
                        onClick={onClose}
                        className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-lg transition-colors"
                      >
                        {sub.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <SheetClose asChild key={item.href}>
            <Link
              href={item.href}
              onClick={onClose}
              className="px-4 py-3.5 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          </SheetClose>
        );
      })}
    </>
  );
}
