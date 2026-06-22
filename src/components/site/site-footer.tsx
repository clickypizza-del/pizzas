import Image from "next/image";
import { Facebook } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/icons";
import { SITE } from "@/lib/site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const MENU_LINKS = [
  { href: "#menu", label: "Clásicas" },
  { href: "#menu", label: "Especiales" },
  { href: "#freezer", label: "Catálogo optimizado" },
  { href: "#suscripcion", label: "Suscripción" },
];

const COMPANY_LINKS = [
  { href: "#filosofia", label: "Nuestra filosofía" },
  { href: "#suscripcion", label: "Suscripción" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#zonas", label: "Zonas de entrega" },
  { href: "#faq", label: "Preguntas frecuentes" },
];

export function SiteFooter() {
  return (
    <footer
      className="bg-[#080808] border-t border-border text-muted-foreground"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Pie de página
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid md:grid-cols-12 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={SITE.logoUrl}
                alt={`${SITE.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <span className="font-brand text-2xl text-foreground">
                Click<span className="text-primary">&</span>Pizza
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Experiencia gourmet congelada, directa del horno a tu freezer.
              Calidad premium sin salir de casa.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="size-10 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook de Click & Pizza"
              >
                <Facebook className="size-4" aria-hidden />
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                aria-label={`Instagram @${SITE.instagram}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                  aria-hidden
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 bg-card border border-border rounded-full flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp de Click & Pizza"
              >
                <WhatsAppIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Menu links */}
          <nav className="md:col-span-2" aria-label="Menú">
            <h3 className="text-foreground font-bold mb-4 text-sm">Menú</h3>
            <ul className="space-y-2.5">
              {MENU_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company links */}
          <nav className="md:col-span-3" aria-label="Empresa">
            <h3 className="text-foreground font-bold mb-4 text-sm">Empresa</h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + QR */}
          <div className="md:col-span-2">
            <h3 className="text-foreground font-bold mb-4 text-sm">Contacto</h3>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={SITE.qrUrl}
                alt="Código QR de WhatsApp Business de Click & Pizza"
                width={88}
                height={88}
                className="size-20 sm:size-22 rounded-lg border border-primary p-1.5 bg-white"
                loading="lazy"
              />
              <div>
                <p className="text-foreground font-semibold text-sm mb-1">
                  Escaneá el QR
                </p>
                <p className="text-xs">o hacé clic abajo</p>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#1ebe5c] transition-colors text-sm mt-1 font-medium"
                >
                  <WhatsAppIcon className="size-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
            <p className="text-xs">
              <span className="block text-foreground font-medium mb-0.5">
                Horarios
              </span>
              Lun–Vie 9–21 hs · Sáb 10–14 hs
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {new Date().getFullYear()} Click &amp; Pizza. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacidad
            </a>
            <a href="#faq" className="hover:text-primary transition-colors">
              Ayuda
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
