"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore, cartTotalItems } from "@/lib/cart-store";

export function CartFab() {
  const { items, openCart } = useCartStore();
  const count = cartTotalItems(items);

  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed bottom-4 z-40 size-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center transition-all active:scale-95 lg:bottom-5 lg:size-14"
      style={{ left: "max(1rem, env(safe-area-inset-left, 16px))" }}
      aria-label={`Abrir carrito (${count} productos)`}
    >
      <ShoppingBag className="size-5 lg:size-6" />
      <span className="absolute -top-1 -right-1 size-5 rounded-full bg-brand-amber text-black text-[10px] font-extrabold flex items-center justify-center">
        {count > 99 ? "99+" : count}
      </span>
    </button>
  );
}
