// Genera src/app/favicon.ico (multi-tamaño 16/32/48, PNG embebido) a partir
// del logo circular public/logo-nueva-salud.png. Reproducible:
//   node scripts/gen-favicons.mjs
import sharp from "sharp";

const SRC = "public/logo-nueva-salud.png";
const SIZES = [16, 32, 48];

const pngs = await Promise.all(
  SIZES.map((s) =>
    sharp(SRC).resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
  ),
);

// Construye un .ico con PNGs embebidos (formato soportado por navegadores modernos).
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reservado
header.writeUInt16LE(1, 2); // tipo: icono
header.writeUInt16LE(SIZES.length, 4); // número de imágenes

const entries = [];
let offset = 6 + SIZES.length * 16;
for (let i = 0; i < SIZES.length; i++) {
  const s = SIZES[i];
  const data = pngs[i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(s >= 256 ? 0 : s, 0); // ancho
  entry.writeUInt8(s >= 256 ? 0 : s, 1); // alto
  entry.writeUInt8(0, 2); // paleta
  entry.writeUInt8(0, 3); // reservado
  entry.writeUInt16LE(1, 4); // planos
  entry.writeUInt16LE(32, 6); // bits por pixel
  entry.writeUInt32LE(data.length, 8); // tamaño de datos
  entry.writeUInt32LE(offset, 12); // offset
  offset += data.length;
  entries.push(entry);
}

const ico = Buffer.concat([header, ...entries, ...pngs]);
await sharp; // no-op para mantener import
const fs = await import("node:fs");
fs.writeFileSync("src/app/favicon.ico", ico);
console.log("wrote src/app/favicon.ico", `(${SIZES.join("/")} px, ${ico.length} bytes)`);
