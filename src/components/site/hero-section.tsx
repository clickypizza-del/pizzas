"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Clock, Star, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function getDeliveryDates(year: number, month: number): number[] {
  const dates: number[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const day = new Date(year, month, d).getDay();
    if (day === 2 || day === 4) dates.push(d); // martes y jueves
  }
  return dates;
}

function getOrderDates(year: number, month: number): number[] {
  const dates: number[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const day = new Date(year, month, d).getDay();
    if (day === 1 || day === 3) dates.push(d); // lunes y miércoles
  }
  return dates;
}

function getNextDeliveryDay(): string {
  const today = new Date().getDay();
  if (today === 2) return "jueves";
  if (today === 4) return "martes";
  return today > 4 || today === 0 ? "martes" : "jueves";
}

function DeliveryCalendar({ onClose }: { onClose: () => void }) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const deliveryDates = getDeliveryDates(year, month);
  const orderDates = getOrderDates(year, month);
  const today = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div
      className="absolute top-full left-0 mt-2 z-50 bg-card border border-border rounded-2xl shadow-2xl shadow-black/50 p-4 w-72"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth} className="p-1 hover:bg-secondary rounded-lg transition-colors">
          <ChevronLeft className="size-4 text-muted-foreground" />
        </button>
        <span className="text-sm font-bold text-foreground">
          {MONTHS[month]} {year}
        </span>
        <button type="button" onClick={nextMonth} className="p-1 hover:bg-secondary rounded-lg transition-colors">
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isDelivery = deliveryDates.includes(day);
          const isOrder = orderDates.includes(day);
          const isToday = day === today && month === currentMonth && year === currentYear;
          const isPast = (month < currentMonth && year === currentYear) || year < currentYear ||
            (month === currentMonth && year === currentYear && day < today);

          return (
            <div
              key={day}
              className={`relative flex items-center justify-center h-8 rounded-lg text-xs font-medium transition-colors
                ${isToday ? "ring-2 ring-primary" : ""}
                ${isDelivery && !isPast ? "bg-brand-green text-white font-bold" : ""}
                ${isOrder && !isPast ? "bg-primary/20 text-primary" : ""}
                ${isPast ? "text-muted-foreground/40" : "text-foreground"}
                ${!isDelivery && !isOrder && !isPast ? "hover:bg-secondary" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full bg-primary/40" />
          <span className="text-[10px] text-muted-foreground">Pedido (Lun/Mié)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full bg-brand-green" />
          <span className="text-[10px] text-muted-foreground">Entrega (Mar/Jue)</span>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [showCalendar, setShowCalendar] = useState(false);
  const nextDay = getNextDeliveryDay();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-52 lg:pb-32"
    >
      {/* Ambient red glows */}
      <div
        aria-hidden
        className="absolute -top-32 right-0 w-[32rem] h-[32rem] bg-primary/20 rounded-full blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 70% 20%, #1f1212 0%, #0f0f0f 45%, #0a0a0a 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 bg-gradient-to-r from-primary to-brand-red-bright rounded-[2rem] blur-3xl opacity-20"
          />
          <div className="relative rounded-2xl lg:rounded-[2rem] overflow-hidden border border-border shadow-2xl shadow-black/50">
            {/* Image — different aspect ratios for mobile vs desktop */}
            <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[16/7]">
              <Image
                src="/hero.webp"
                alt="Pizzas gourmet recién horneadas con ingredientes premium"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
              />
            </div>

            {/* Solid dark overlay — ensures text is always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

            {/* Text overlay — stacked on mobile, centered on desktop */}
            <div className="absolute inset-0 flex items-end sm:items-center">
              <div className="w-full px-4 sm:px-8 lg:px-14 py-8 sm:py-0">
                <div className="max-w-xl">
                  {/* Calendar trigger */}
                  <div className="relative inline-block">
                    <button
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="inline-flex items-center gap-2 bg-brand-amber/10 border border-brand-amber/25 rounded-full px-3 py-1.5 mb-3 sm:mb-6 hover:bg-brand-amber/20 transition-colors cursor-pointer"
                    >
                      <span
                        aria-hidden
                        className="w-2 h-2 bg-brand-amber rounded-full animate-pulse"
                      />
                      <span className="text-brand-amber text-[11px] sm:text-sm font-semibold tracking-wide">
                        🗓 Próxima entrega: {nextDay}
                      </span>
                      <span className="text-brand-amber/60 text-[10px]">▼</span>
                    </button>

                    {showCalendar && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowCalendar(false)} />
                        <DeliveryCalendar onClose={() => setShowCalendar(false)} />
                      </>
                    )}
                  </div>

                  <h1
                    id="hero-title"
                    className="font-brand text-3xl sm:text-5xl lg:text-7xl text-white leading-[1.05] tracking-tight"
                  >
                    Pizza Gourmet.{" "}
                    <span className="text-gradient-brand">Lista en 15 minutos.</span>
                  </h1>
                  <p className="mt-2 sm:mt-6 text-sm sm:text-lg text-white/80 leading-relaxed max-w-md">
                    Del freezer a tu mesa. Sin pasar por el supermercado. Masa artesanal, ingredientes premium.
                  </p>
                  <div className="mt-4 sm:mt-9 flex flex-col sm:flex-row gap-3">
                    <Button
                      asChild
                      size="lg"
                      className="cta-hero px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-semibold"
                    >
                      <a href="#planes">
                        Ver planes
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="cta-inline px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base border-white/30 text-white hover:bg-white hover:text-black hover:border-white"
                    >
                      <a href="#menu">Ver el catálogo</a>
                    </Button>
                  </div>

                  {/* Trust strip */}
                  <dl className="mt-5 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 max-w-xs sm:max-w-lg">
                    {[
                      { v: "15 min", l: "Al horno", icon: Clock },
                      { v: "4.9★", l: "Valoración", icon: Star },
                      { v: "100%", l: "Natural", icon: Leaf },
                    ].map((item) => (
                      <div
                        key={item.l}
                        className="flex flex-col items-center sm:items-start gap-0.5 sm:gap-1"
                      >
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <item.icon className="size-3 sm:size-4 text-primary" aria-hidden />
                          <dd className="text-base sm:text-3xl font-extrabold text-white">
                            {item.v}
                          </dd>
                        </div>
                        <dt className="text-[9px] sm:text-xs text-white/60">{item.l}</dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
