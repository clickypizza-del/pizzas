import type { Metadata } from "next";
import { PanificadosPage } from "@/components/site/panificados-page";

export const metadata: Metadata = {
  title: "Panificados",
  description:
    "El mismo cuidado artesanal que ponemos en nuestras pizzas, ahora en panes y masas. Todos se congelan perfecto para que tengas pan fresco cuando quieras.",
};

export default function Page() {
  return <PanificadosPage />;
}
