import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Marquee } from "@/components/Marquee";
import { Menu } from "@/components/Menu";
import { Navbar } from "@/components/Navbar";
import { Order } from "@/components/Order";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* La marge basse laisse la place à la barre d’action mobile. */}
      <main className="pb-24 sm:pb-0">
        <Hero />
        <Marquee />
        <About />
        <Menu />
        <Features />
        <Order />
        <Gallery />
        <Location />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
