import type { Metadata } from "next";
import { AceitunasPage } from "@/components/site/aceitunas-page";

export const metadata: Metadata = {
  title: "Aceitunas Verdes Rellenas Gourmet",
  description:
    "14 variedades de aceitunas verdes rellenas gourmet. Almendra, morrón, jamón crudo, roquefort y más. Artesanales, congeladas, listas para disfrutar.",
  alternates: { canonical: "/aceitunas" },
};

export default function Page() {
  return <AceitunasPage />;
}
