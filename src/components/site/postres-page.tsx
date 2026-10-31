import { ProductLinePage } from "@/components/site/product-line-page";
import { POSTRES } from "@/lib/site-data";
import { WA_MESSAGES } from "@/lib/whatsapp";

export function PostresPage() {
  return (
    <ProductLinePage
      eyebrow="MMM Postre!"
      title={
        <>
          Postres que se recuerdan{" "}
          <span className="text-gradient-brand">en cada bocado</span>
        </>
      }
      description="Nuestra línea de postres artesanales congelados. Elaborados con ingredientes reales y congelados en su punto justo para que los sirvas como recién hechos, sin trabajo ni complicaciones."
      items={POSTRES}
      tips={{
        title: "Consejos para servir postres congelados",
        rows: [
          {
            id: "lemon-pie",
            product: "Lemon Pie",
            technique:
              "Pasar del freezer a la heladera 4–6 hs antes de servir. Terminar con merengue flameado si querés el efecto recién horneado.",
          },
          {
            id: "porciones",
            product: "Porciones individuales",
            technique:
              "Cortar con cuchillo caliente y limpiar entre cortes para que las porciones queden prolijas.",
          },
          {
            id: "merengue",
            product: "Merengue",
            technique:
              "Servir bien frío. Si usás soplete, hacerlo justo antes de llevar a la mesa.",
          },
        ],
      }}
      footerText="Próximamente más postres. Consultá disponibilidad y sabores de la semana por WhatsApp."
      ctaLabel="Consultar postres"
      whatsappMessage={WA_MESSAGES.postres}
      inquiryLabel="postre"
    />
  );
}
