import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/CtaBand";
import { MenuList } from "@/components/sections/MenuList";
import { PageHeader } from "@/components/sections/PageHeader";
import { ReservationBand } from "@/components/sections/ReservationBand";

export const metadata: Metadata = {
  title: "Notre menu",
  description:
    "Découvrez la carte de GV Express, au Centre Hospitalier National de Pikine, Camp Thiaroye. Commandez sur place, à emporter ou à distance.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="La carte"
        title="Notre menu"
        breadcrumb="Menu"
        description="Découvrez nos spécialités et choisissez votre prochaine envie."
        image="/images/menu/plat-03.webp"
      />
      <MenuList />
      <ReservationBand />
      <CtaBand />
    </>
  );
}
