import { AboutIntro } from "@/components/sections/AboutIntro";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { LocationBlock } from "@/components/sections/LocationBlock";
import { ReservationBand } from "@/components/sections/ReservationBand";
import { Specialties } from "@/components/sections/Specialties";
import { Voices } from "@/components/sections/Voices";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <Specialties />
      <ReservationBand />
      <AboutIntro />
      <Gallery />
      <Voices />
      <LocationBlock />
      <CtaBand />
    </>
  );
}
