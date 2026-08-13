import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { StructuredData } from "@/components/StructuredData";
import { restaurant } from "@/data/restaurant";

import "./globals.css";

/**
 * Polices auto-hébergées : aucun appel réseau externe au chargement,
 * donc pas de dépendance à Google Fonts et un premier rendu plus rapide.
 */
const fraunces = localFont({
  src: "./fonts/fraunces-var.woff2",
  variable: "--font-fraunces",
  weight: "300 900",
  display: "swap",
  preload: true,
});

const inter = localFont({
  src: "./fonts/inter-var.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gv-express.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GV Express | Restaurant à Pikine — Camp Thiaroye",
    template: "%s | GV Express",
  },
  description:
    "Découvrez GV Express au Centre Hospitalier National de Pikine, Camp Thiaroye. Consultez notre menu et contactez-nous pour commander.",
  applicationName: restaurant.name,
  keywords: [
    "GV Express",
    "restaurant Pikine",
    "Camp Thiaroye",
    "restaurant Dakar",
    "commander à Pikine",
    "Centre Hospitalier National de Pikine",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: siteUrl,
    siteName: restaurant.name,
    title: "GV Express | Restaurant à Pikine — Camp Thiaroye",
    description:
      "Découvrez GV Express au Centre Hospitalier National de Pikine, Camp Thiaroye. Consultez notre menu et contactez-nous pour commander.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GV Express | Restaurant à Pikine — Camp Thiaroye",
    description:
      "Découvrez GV Express au Centre Hospitalier National de Pikine, Camp Thiaroye. Consultez notre menu et contactez-nous pour commander.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#14100c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/* Sans JavaScript, les blocs animés resteraient invisibles. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Aller au contenu
        </a>

        <MotionProvider>
          <Navbar />

          {/* La marge basse laisse la place à la barre d'action mobile. */}
          <main id="contenu" className="pb-[4.75rem] sm:pb-0">
            {children}
          </main>

          <Footer />
          <MobileActionBar />
        </MotionProvider>
        <StructuredData />
      </body>
    </html>
  );
}
