/**
 * optimize-images.mjs
 * Reads brand assets from _zip_temp/Elevateo/ and writes optimized versions
 * to public/images/. Converts PNG → WebP (and PNG for favicons).
 *
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, parse } from "node:path";

const SRC = "_zip_temp/Elevateo";
const DEST = "public/images";

// --- Helpers ---

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function toWebp(src, dest, opts) {
  const img = sharp(src);
  const meta = await img.metadata();

  let pipeline = img;
  pipeline = pipeline.rotate();  // Auto-orient per EXIF; no-op when no orientation flag is present

  if (opts.width && meta.width > opts.width) {
    pipeline = pipeline.resize({ width: opts.width, withoutEnlargement: true });
  }
  if (opts.height && meta.height > opts.height) {
    pipeline = pipeline.resize({ height: opts.height, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: opts.quality || 80 }).toFile(dest);
  return dest;
}

async function toPng(src, dest, opts) {
  const img = sharp(src);
  let pipeline = img;

  if (opts.width) {
    pipeline = pipeline.resize({ width: opts.width, height: opts.width, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  }

  await pipeline.png({ quality: opts.quality || 80 }).toFile(dest);
  return dest;
}

function logResult(label, dest) {
  import("node:fs").then(fs => {
    const stat = fs.statSync(dest);
    const kb = (stat.size / 1024).toFixed(1);
    console.log(`  ✓ ${label} → ${kb} KB`);
  });
}

// --- Logos ---
async function processLogos() {
  console.log("\n🖼  Logos:");
  const dir = join(DEST, "logos");
  await ensureDir(dir);

  const srcFull = join(SRC, "logos/transparent/logo-full.png");
  const srcIcon = join(SRC, "logos/transparent/logo-icon.png");

  const tasks = [
    toWebp(srcFull, join(dir, "logo-full.webp"), { width: 400, quality: 85 }),
    toWebp(srcIcon, join(dir, "logo-icon.webp"), { width: 200, quality: 85 }),
    toPng(srcIcon, join(dir, "logo-icon-32.png"), { width: 32 }),
    toPng(srcIcon, join(dir, "logo-icon-180.png"), { width: 180 }),
  ];

  const results = await Promise.all(tasks);
  results.forEach((f, i) => logResult(["logo-full.webp", "logo-icon.webp", "logo-icon-32.png", "logo-icon-180.png"][i], f));
}

// --- Icons ---
async function processIcons() {
  console.log("\n🎯 Icons:");
  const dir = join(DEST, "icons");
  await ensureDir(dir);

  // Use with-background variants for richer appearance
  const srcDir = join(SRC, "icons/with-background");
  const files = await readdir(srcDir);
  const pngs = files.filter(f => f.endsWith(".png"));

  for (const file of pngs) {
    const name = parse(file).name;
    const dest = join(dir, `${name}.webp`);
    await toWebp(join(srcDir, file), dest, { width: 120, quality: 80 });
    logResult(name, dest);
  }
}

// --- Heroes ---
async function processHeroes() {
  console.log("\n🦸 Heroes:");
  const dir = join(DEST, "heroes");
  await ensureDir(dir);

  // Select 1 per category (with-background variants for visual richness)
  const selected = [
    "flowryse-1.png",
    "flowryse-2.png",
    "seo-1.png",
    "paid-ads-1.png",
    "email-sms-1.png",
    "social-media-1.png",
    "website-1.png",
  ];

  for (const file of selected) {
    const name = parse(file).name;
    const dest = join(dir, `${name}.webp`);
    await toWebp(join(SRC, "heroes/with-background", file), dest, { height: 800, quality: 80 });
    logResult(name, dest);
  }
}

// --- Banners ---
async function processBanners() {
  console.log("\n🏞  Banners:");
  const dir = join(DEST, "banners");
  await ensureDir(dir);

  // Pick the 3 smallest (most efficient) banners
  const srcDir = join(SRC, "banners");
  const files = await readdir(srcDir);
  const pngs = files.filter(f => f.endsWith(".png")).slice(0, 3);

  for (let i = 0; i < pngs.length; i++) {
    const dest = join(dir, `banner-${i + 1}.webp`);
    await toWebp(join(srcDir, pngs[i]), dest, { width: 1920, quality: 75 });
    logResult(`banner-${i + 1}`, dest);
  }
}

// --- Lachlan ---
async function processLachlan() {
  console.log("\n👤 Lachlan:");
  const dir = join(DEST, "lachlan");
  await ensureDir(dir);

  // NOTE: Do NOT use SRC constant — SRC points to "_zip_temp/Elevateo", not Lachlan's folder.
  const srcPortrait = join("_zip_temp/Lachlan", "Portrait.JPG");
  const srcWarRoom  = join("_zip_temp/Lachlan", "Picture_with_War_Room_members.JPG");

  const tasks = [
    toWebp(srcPortrait, join(dir, "lachlan-portrait.webp"), { width: 1600, quality: 82 }),
    toWebp(srcWarRoom,  join(dir, "lachlan-warroom.webp"),  { width: 1800, quality: 80 }),
  ];

  const results = await Promise.all(tasks);
  results.forEach((f, i) => logResult(["lachlan-portrait.webp", "lachlan-warroom.webp"][i], f));
}

// --- Main ---
async function main() {
  console.log("Optimizing Elevateo brand assets...");
  await ensureDir(DEST);

  await processLogos();
  await processIcons();
  await processHeroes();
  await processBanners();
  await processLachlan();

  console.log("\n✅ Done! All images written to public/images/");
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
