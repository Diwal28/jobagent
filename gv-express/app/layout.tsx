import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

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
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0908",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Aller au menu
        </a>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
