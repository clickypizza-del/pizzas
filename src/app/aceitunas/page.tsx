import type { Metadata } from "next";
import { AceitunasPage } from "@/components/site/aceitunas-page";

export const metadata: Metadata = {
  title: "Picadas Gourmet — Aceitunas y Bebidas",
  description:
    "Armá la picada perfecta: aceitunas verdes rellenas artesanales y las mejores bebidas para acompañar. Gaseosas, cervezas, aguas y jugos. Todo para tu picada gourmet.",
  alternates: { canonical: "/aceitunas" },
};

export default function Page() {
  return <AceitunasPage />;
}
