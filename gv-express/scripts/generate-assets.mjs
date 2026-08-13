/**
 * ─────────────────────────────────────────────────────────────
 *  GÉNÉRATEUR DE VISUELS — GV EXPRESS
 * ─────────────────────────────────────────────────────────────
 *  Aucune photo réelle du restaurant n'était disponible lors de
 *  la réalisation de cette démo. Ce script fabrique des visuels
 *  d'ambiance originaux (compositions lumineuses chaudes) pour
 *  que la maquette soit présentable immédiatement.
 *
 *  Ces visuels sont TEMPORAIRES : ils sont destinés à être
 *  remplacés par les photos de GV Express.
 *
 *  Utilisation :  node scripts/generate-assets.mjs
 *  (dépendance : sharp — déjà en devDependencies)
 * ─────────────────────────────────────────────────────────────
 */

import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const INK = "#0b0908";
const WARM = [
  ["#e0642c", "#8f3312"], // braise
  ["#f0a44f", "#a8501c"], // ambre
  ["#c8a15a", "#6b4a1f"], // doré
  ["#d8542a", "#5e2410"], // paprika
  ["#b8703a", "#4a2412"], // terre cuite
];

/** PRNG déterministe : mêmes visuels à chaque exécution. */
function rng(seed) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Composition de fond : nappes de lumière chaude sur fond profond. */
function buildSvg({ w, h, seed, mode }) {
  const r = rng(seed);
  const max = Math.max(w, h);
  const isPlate = mode === "plate";

  // Nappes chaudes : petites et espacées, pour garder de l'ombre.
  const blobs = [];
  const count = isPlate ? 3 : 5;
  for (let i = 0; i < count; i += 1) {
    const pair = WARM[Math.floor(r() * WARM.length)];
    blobs.push({
      id: `g${i}`,
      from: pair[0],
      to: pair[1],
      cx: r() * w,
      cy: r() * h,
      rad: (0.12 + r() * 0.2) * max,
      op: 0.5 + r() * 0.3,
    });
  }

  // Masses sombres : cassent l'aplat et créent du volume.
  const shadows = [];
  for (let i = 0; i < 4; i += 1) {
    shadows.push({
      id: `s${i}`,
      cx: r() * w,
      cy: h * (0.35 + r() * 0.75),
      rad: (0.2 + r() * 0.28) * max,
    });
  }

  // Source lumineuse dominante : donne la direction de la lumière.
  const keyX = isPlate ? w * 0.5 : w * (0.22 + r() * 0.4);
  const keyY = isPlate ? h * 0.44 : h * (0.16 + r() * 0.28);
  const keyRad = max * (isPlate ? 0.3 : 0.34);

  const defs = [
    ...blobs.map(
      (b) => `<radialGradient id="${b.id}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${b.from}" stop-opacity="${b.op.toFixed(2)}"/>
        <stop offset="48%" stop-color="${b.to}" stop-opacity="${(b.op * 0.45).toFixed(2)}"/>
        <stop offset="100%" stop-color="${INK}" stop-opacity="0"/>
      </radialGradient>`,
    ),
    ...shadows.map(
      (s) => `<radialGradient id="${s.id}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${INK}" stop-opacity="0.94"/>
        <stop offset="100%" stop-color="${INK}" stop-opacity="0"/>
      </radialGradient>`,
    ),
  ].join("");

  const warmShapes = blobs
    .map(
      (b) =>
        `<circle cx="${b.cx.toFixed(1)}" cy="${b.cy.toFixed(1)}" r="${b.rad.toFixed(1)}" fill="url(#${b.id})"/>`,
    )
    .join("");

  const darkShapes = shadows
    .map(
      (s) =>
        `<circle cx="${s.cx.toFixed(1)}" cy="${s.cy.toFixed(1)}" r="${s.rad.toFixed(1)}" fill="url(#${s.id})"/>`,
    )
    .join("");

  // Bande sombre au premier plan : ancre la composition.
  const foreground = `<rect x="0" y="${(h * 0.74).toFixed(0)}" width="${w}" height="${(h * 0.26).toFixed(0)}" fill="${INK}" opacity="0.55"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      ${defs}
      <radialGradient id="key" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffdcae" stop-opacity="0.8"/>
        <stop offset="38%" stop-color="#e0642c" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${INK}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="${INK}"/>
    ${warmShapes}
    <circle cx="${keyX.toFixed(1)}" cy="${keyY.toFixed(1)}" r="${keyRad.toFixed(1)}" fill="url(#key)"/>
    ${darkShapes}
    ${foreground}
  </svg>`;
}

/**
 * Calque « emplacement photo » : tissage fin + monogramme.
 * Assumé comme tel — mieux vaut un emplacement dessiné avec soin
 * qu'une fausse photo de plat.
 */
function slotOverlaySvg(w, h) {
  const min = Math.min(w, h);
  const step = Math.round(min / 26);
  const ring = min * 0.13;

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs>
        <pattern id="weave" width="${step}" height="${step}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="${step}" height="${step}" fill="none"/>
          <line x1="0" y1="0" x2="0" y2="${step}" stroke="#f5eee4" stroke-opacity="0.11" stroke-width="1"/>
          <line x1="0" y1="0" x2="${step}" y2="0" stroke="#f5eee4" stroke-opacity="0.06" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#weave)"/>
      <circle cx="${w / 2}" cy="${h / 2}" r="${ring}" fill="none"
        stroke="#f5eee4" stroke-opacity="0.3" stroke-width="${Math.max(1, min * 0.0025)}"/>
      <text x="50%" y="${h / 2}" text-anchor="middle" dominant-baseline="central"
        font-family="Fraunces" font-size="${ring * 0.78}" font-weight="500"
        fill="#f5eee4" fill-opacity="0.45">GV</text>
    </svg>`,
  );
}

/** Grain argentique : évite l'aspect « dégradé synthétique ». */
function noiseBuffer(w, h, alpha, seed) {
  const r = rng(seed);
  const px = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i += 1) {
    const v = 90 + Math.floor(r() * 165);
    px[i * 4] = v;
    px[i * 4 + 1] = v;
    px[i * 4 + 2] = v;
    px[i * 4 + 3] = alpha;
  }
  return sharp(px, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toBuffer();
}

function vignetteSvg(w, h, strength = 0.72) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs><radialGradient id="v" cx="50%" cy="48%" r="72%">
        <stop offset="45%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="${strength}"/>
      </radialGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#v)"/>
    </svg>`,
  );
}

async function makeImage({ w, h, seed, mode, out, blur = 34, slot = false, lift = 0 }) {
  const base = await sharp(Buffer.from(buildSvg({ w, h, seed, mode })))
    .blur(blur)
    .toBuffer();

  const noise = await noiseBuffer(w, h, mode === "plate" ? 34 : 40, seed + 7);

  await sharp(base)
    .composite([
      { input: noise, blend: "overlay" },
      { input: vignetteSvg(w, h, slot ? 0.52 : 0.88 - lift), blend: "over" },
      ...(slot ? [{ input: slotOverlaySvg(w, h), blend: "over" }] : []),
    ])
    // Étalonnage : contraste marqué, saturation contenue, ombres profondes.
    .linear(slot ? 1.06 : 1.16, slot ? -4 : -16)
    .modulate({ saturation: 0.9, brightness: (slot ? 1.12 : 0.94) + lift })
    .webp({ quality: 78, effort: 6 })
    .toFile(out);

  console.log("✓", out);
}

/** Marque « GV » — utilisée pour le favicon et l'icône mobile. */
function markSvg(size, withRing = true) {
  const s = size;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
      <defs>
        <linearGradient id="e" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f0a44f"/>
          <stop offset="100%" stop-color="#d8542a"/>
        </linearGradient>
      </defs>
      <rect width="${s}" height="${s}" rx="${s * 0.22}" fill="${INK}"/>
      ${
        withRing
          ? `<circle cx="${s / 2}" cy="${s / 2}" r="${s * 0.34}" fill="none" stroke="url(#e)" stroke-width="${s * 0.035}" stroke-opacity="0.9"/>`
          : ""
      }
      <text x="50%" y="${s * 0.5}" text-anchor="middle" dominant-baseline="central"
        font-family="Fraunces" font-size="${s * 0.36}" font-weight="600"
        letter-spacing="${s * 0.005}" fill="#f5eee4">GV</text>
    </svg>`,
  );
}

async function makeIcons() {
  await sharp(markSvg(512)).png().toFile("app/icon.png");
  console.log("✓ app/icon.png");
  await sharp(markSvg(180)).png().toFile("app/apple-icon.png");
  console.log("✓ app/apple-icon.png");
  await mkdir("public/logo", { recursive: true });
  await writeFile("public/logo/gv-mark.svg", markSvg(512));
  console.log("✓ public/logo/gv-mark.svg");
}

/** Image de partage (Open Graph / Twitter). */
async function makeOgImage() {
  const w = 1200;
  const h = 630;
  const base = await sharp(Buffer.from(buildSvg({ w, h, seed: 4242, mode: "hero" })))
    .blur(40)
    .toBuffer();
  const noise = await noiseBuffer(w, h, 30, 99);

  const text = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <text x="80" y="250" font-family="Inter" font-size="20" font-weight="700"
        letter-spacing="6" fill="#c8a15a">GV EXPRESS</text>
      <text x="76" y="360" font-family="Fraunces" font-size="88" font-weight="600"
        fill="#f5eee4">Le goût qui vous accompagne.</text>
      <text x="80" y="430" font-family="Inter" font-size="26" fill="#c4b8a9">
        Centre Hospitalier National de Pikine — Camp Thiaroye, Dakar
      </text>
      <rect x="80" y="480" width="64" height="2" fill="#e0642c"/>
      <text x="80" y="545" font-family="Inter" font-size="30" font-weight="600" fill="#f5eee4">
        +221 78 542 05 05
      </text>
      <text x="900" y="545" font-family="Inter" font-size="22" fill="#c4b8a9">08:00 – 23:00</text>
    </svg>`,
  );

  await sharp(base)
    .composite([
      { input: noise, blend: "overlay" },
      { input: vignetteSvg(w, h, 0.8), blend: "over" },
      { input: text, blend: "over" },
    ])
    .png()
    .toFile("app/opengraph-image.png");
  console.log("✓ app/opengraph-image.png");
}

async function main() {
  await mkdir("public/images/menu", { recursive: true });
  await mkdir("public/images/gallery", { recursive: true });

  // Hero — grande image d'ambiance, plein écran.
  await makeImage({ w: 2000, h: 1400, seed: 11, mode: "hero", out: "public/images/hero.webp", blur: 30, lift: 0.22 });

  // Section « À propos » — format portrait.
  await makeImage({ w: 1200, h: 1500, seed: 23, mode: "hero", out: "public/images/salle.webp", blur: 26, slot: true });

  // Section « Retrouvez-nous ».
  await makeImage({ w: 1400, h: 1000, seed: 77, mode: "hero", out: "public/images/lieu.webp", blur: 26, slot: true });

  // Cartes du menu.
  for (let i = 1; i <= 10; i += 1) {
    await makeImage({
      w: 1000,
      h: 800,
      seed: 100 + i * 13,
      mode: "plate",
      out: `public/images/menu/plat-${String(i).padStart(2, "0")}.webp`,
      blur: 20,
      slot: true,
    });
  }

  // Galerie — formats mixtes pour une composition asymétrique.
  const gallery = [
    [1200, 1600],
    [1600, 1200],
    [1200, 1200],
    [1200, 1200],
    [1200, 1600],
    [1600, 1200],
  ];
  for (let i = 0; i < gallery.length; i += 1) {
    const size = gallery[i];
    await makeImage({
      w: size[0],
      h: size[1],
      seed: 300 + i * 29,
      mode: i % 2 === 0 ? "hero" : "plate",
      out: `public/images/gallery/ambiance-${String(i + 1).padStart(2, "0")}.webp`,
      blur: 24,
      slot: true,
    });
  }

  await makeIcons();
  await makeOgImage();
}

main().catch((error) => {
  console.error("Échec de la génération des visuels :", error);
  process.exit(1);
});
