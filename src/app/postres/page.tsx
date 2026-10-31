import type { Metadata } from "next";
import { PostresPage } from "@/components/site/postres-page";

export const metadata: Metadata = {
  title: "MMM Postre! — Postres artesanales congelados",
  description:
    "Postres artesanales congelados: Lemon Pie con merengue flameado, listo para servir. Elaborados con ingredientes reales en Mendoza.",
  alternates: { canonical: "/postres" },
};

export default function Page() {
  return <PostresPage />;
}
