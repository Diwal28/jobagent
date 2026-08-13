import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gv-express.vercel.app";

/** Toutes les pages du site, avec leur priorité relative. */
const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/menu", priority: 0.9 },
  { path: "/reservation", priority: 0.9 },
  { path: "/a-propos", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/evenements", priority: 0.6 },
  { path: "/blog", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
