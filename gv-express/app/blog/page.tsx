import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, Info } from "lucide-react";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHeader } from "@/components/sections/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { POSTS_ARE_PLACEHOLDER, posts } from "@/data/posts";
import { restaurant, whatsappUrl } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Les actualités de GV Express : nouveautés à la carte, informations pratiques et coulisses du restaurant.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Actualités"
        breadcrumb="Blog"
        description="Les nouvelles du restaurant, les informations pratiques et les coulisses du service."
        image="/images/gallery/ambiance-01.webp"
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-gv">
          {POSTS_ARE_PLACEHOLDER && (
            <Reveal>
              <p className="mx-auto flex max-w-3xl items-start gap-3 border border-gold/30 bg-gold/[0.07] px-5 py-4 text-sm leading-relaxed text-cocoa-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-cocoa">Démonstration.</span>{" "}
                  Aucun article n’a encore été rédigé : ni titre, ni date, ni
                  texte n’ont été inventés. Les emplacements ci-dessous montrent
                  la mise en page définitive.
                </span>
              </p>
            </Reveal>
          )}

          {/* Article à la une */}
          {featured && (
            <Reveal delay={0.06}>
              <article className="group mt-12 grid overflow-hidden border border-line bg-cream-3 lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
                  <Image
                    src={featured.image}
                    alt={`Emplacement photo réservé pour ${featured.title.toLowerCase()}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
                    À la une
                  </span>
                </div>

                <div className="flex flex-col justify-center p-8 sm:p-11">
                  <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-cocoa-faint">
                    <span className="text-gold-ink">{featured.category}</span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {featured.dateLabel}
                    </span>
                  </p>

                  <h2 className="display-2 mt-4 text-[1.75rem] text-cocoa text-balance sm:text-[2.25rem]">
                    {featured.title}
                  </h2>

                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-cocoa-muted text-pretty">
                    {featured.excerpt}
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2 self-start border-b border-line-strong pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cocoa-faint">
                    Lecture à venir
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </article>
            </Reveal>
          )}

          {/* Autres articles */}
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <Reveal as="li" key={post.id} delay={Math.min(index * 0.06, 0.3)}>
                <article className="group flex h-full flex-col overflow-hidden border border-line bg-cream-3 transition-all duration-500 hover:border-gold/50 hover:shadow-[0_24px_50px_-32px_rgba(36,26,18,0.5)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={`Emplacement photo réservé pour ${post.title.toLowerCase()}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-cocoa-faint">
                      <span className="text-gold-ink">{post.category}</span>
                      <span>{post.dateLabel}</span>
                    </p>
                    <h3 className="display-3 mt-3 text-cocoa">{post.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa-muted text-pretty">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <div className="mt-14 border border-dashed border-line-strong bg-cream-2 px-6 py-10 text-center">
              <h2 className="display-3 text-cocoa">
                Une actualité à annoncer&nbsp;?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cocoa-muted text-pretty">
                Nouveau plat, horaires exceptionnels, message aux clients :
                envoyez l’information, elle sera publiée ici.
              </p>
              <ButtonLink
                href={whatsappUrl(
                  `Bonjour ${restaurant.name}, voici une actualité à publier sur le site : `,
                )}
                external
                className="mt-7"
              >
                Proposer une actualité
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
