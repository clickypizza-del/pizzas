import { ProductLinePage } from "@/components/site/product-line-page";
import { PANIFICADOS, FREEZER_SCIENCE_TIPS } from "@/lib/site-data";
import { WA_MESSAGES } from "@/lib/whatsapp";

export function PanificadosPage() {
  return (
    <ProductLinePage
      eyebrow="Más que pizzas"
      title={
        <>
          Nuestra línea de{" "}
          <span className="text-gradient-brand">panificados</span>
        </>
      }
      description="El mismo cuidado artesanal que ponemos en nuestras pizzas, ahora en panes y masas. Todos se congelan perfecto para que tengas pan fresco cuando quieras."
      items={PANIFICADOS}
      tips={{
        title: "Consejos para congelar panificados",
        rows: FREEZER_SCIENCE_TIPS,
      }}
      footerText="Próximamente más variedades de panificados. Consultá disponibilidad por WhatsApp."
      ctaLabel="Consultar panificados"
      whatsappMessage={WA_MESSAGES.general}
      inquiryLabel="panificado"
    />
  );
}
