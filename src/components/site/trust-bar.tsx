import { Leaf, Snowflake, CalendarDays, Wallet } from "lucide-react";

const ITEMS = [
  { icon: Leaf, label: "Sin conservantes ni aditivos" },
  { icon: Snowflake, label: "Congelación IQF" },
  { icon: CalendarDays, label: "Entregas martes y jueves" },
  { icon: Wallet, label: "Efectivo o transferencia" },
];

export function TrustBar() {
  return (
    <section aria-label="Beneficios principales" className="border-y border-border bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          role="list"
          className="flex flex-wrap items-center justify-center sm:justify-between gap-x-6 gap-y-2 py-4"
        >
          {ITEMS.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
              <item.icon className="size-4 text-primary shrink-0" aria-hidden />
              <span className="font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
