import { readFile, writeFile, mkdir } from "node:fs/promises";
import { decompress } from "wawoff2";

const out = process.env.HOME + "/.local/share/fonts";
await mkdir(out, { recursive: true });
for (const [src, name] of [
  ["app/fonts/fraunces-var.woff2", "Fraunces.ttf"],
  ["app/fonts/inter-var.woff2", "Inter.ttf"],
]) {
  const ttf = await decompress(await readFile(src));
  await writeFile(`${out}/${name}`, Buffer.from(ttf));
  console.log("wrote", name, ttf.length);
}
