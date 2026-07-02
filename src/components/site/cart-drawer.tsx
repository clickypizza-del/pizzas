"use client";

import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore, cartSubtotal, cartTotalItems, type CartItem } from "@/lib/cart-store";
import { formatPrice } from "@/lib/catalog-api";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQty, removeItem } = useCartStore();

  return (
    <div className="flex gap-3 py-3 border-b border-border last:border-b-0">
      <div className="size-12 sm:size-14 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={56}
          height={56}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-xs sm:text-sm font-bold text-foreground leading-tight truncate">
            {item.name}
          </h4>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-0.5"
            aria-label={`Eliminar ${item.name}`}
          >
            <X className="size-3.5" />
          </button>
        </div>
        <p className="text-xs sm:text-sm font-extrabold text-price mt-0.5">
          {formatPrice(item.price)}
        </p>
        {item.flavors?.length ? (
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-tight">
            {item.flavors.join(" · ")}
          </p>
        ) : null}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5">
          <button
            type="button"
            onClick={() => updateQty(item.id, item.qty - 1)}
            className="size-6 sm:size-7 rounded-md bg-secondary border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            aria-label="Reducir cantidad"
          >
            <Minus className="size-3" />
          </button>
          <span className="text-xs sm:text-sm font-bold text-foreground w-5 text-center tabular-nums">
            {item.qty}
          </span>
          <button
            type="button"
            onClick={() => updateQty(item.id, item.qty + 1)}
            disabled={!!item.stock && item.qty >= item.stock}
            className="size-6 sm:size-7 rounded-md bg-secondary border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Aumentar cantidad"
          >
            <Plus className="size-3" />
          </button>
          <span className="text-[11px] sm:text-xs text-muted-foreground ml-auto font-medium">
            {formatPrice(item.price * item.qty)}
          </span>
        </div>
        {item.stock && item.stock <= 5 ? (
          <p className="text-[10px] text-brand-amber font-medium mt-1">
            Quedan {item.stock}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { items, isOpen, closeCart, clear } = useCartStore();
  const total = cartSubtotal(items);
  const count = cartTotalItems(items);

  const whatsappItems = items
    .map((i) => {
      let line = `${i.qty}x ${i.name}`;
      if (i.flavors?.length) line += ` (${i.flavors.join(", ")})`;
      return line;
    })
    .join("\n");

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-card">
        <SheetHeader className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-foreground text-sm sm:text-base">
            <ShoppingBag className="size-4 sm:size-5 text-primary" />
            Tu carrito
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              ({count} {count === 1 ? "producto" : "productos"})
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4 sm:px-6">
            <ShoppingBag className="size-12 sm:size-16 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground text-center">
              Tu carrito esta vacio
            </p>
            <Button variant="outline" onClick={closeCart} className="cta-inline text-sm">
              Ver menu
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto cp-scroll px-4 sm:px-6 py-1.5 sm:py-2">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            <div className="border-t border-border px-4 sm:px-6 py-4 sm:py-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-muted-foreground">Subtotal</span>
                <span className="text-base sm:text-lg font-extrabold text-foreground">
                  {formatPrice(total)}
                </span>
              </div>

              <Button
                asChild
                size="lg"
                className="w-full cta-section text-sm sm:text-base"
              >
                <a
                  href={buildWhatsAppUrl(
                    `¡Hola Click & Pizza! Quiero pedir: ${whatsappItems}. Total: ${formatPrice(total)}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pedir por WhatsApp
                </a>
              </Button>

              <button
                type="button"
                onClick={clear}
                className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground hover:text-destructive transition-colors mx-auto"
              >
                <Trash2 className="size-3" />
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
