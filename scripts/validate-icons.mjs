#!/usr/bin/env node
/**
 * PWA icon validator (zero dependencies).
 *
 * Fails the build when any of these is untrue:
 *  - every icon referenced by the web manifest exists on disk
 *  - each icon's real pixel dimensions match its declared "sizes"
 *  - maskable icons are square and fully opaque (Chrome masks have no alpha fallback)
 *  - maskable artwork stays inside Android's 80% safe zone (radius <= 0.40 * width)
 *  - no non-black ("gold") artwork is clipped by any common Android adaptive-icon mask
 *  - the Apple touch / legacy icon sizes iOS and desktop browsers request all exist
 */
import { readFileSync, existsSync } from "node:fs";
import { inflateSync } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");
const MANIFEST = join(PUBLIC_DIR, "manifest.webmanifest");

/** Icons that must exist regardless of the manifest (iOS + desktop favicons). */
const REQUIRED_STANDALONE = [
  { file: "apple-touch-icon.png", size: 180 },
  { file: "icon-167x167.png", size: 167 },
  { file: "icon-152x152.png", size: 152 },
  { file: "favicon.png", size: 64 },
  { file: "favicon-32x32.png", size: 32 },
  { file: "favicon-16x16.png", size: 16 },
];

/**
 * Android adaptive-icon mask shapes, expressed as fractions of the icon width so
 * the test is density independent (mdpi 48px through xxxhdpi 192px and beyond).
 * `cornerRadius` is a fraction of the width; `circle` is the strictest launcher mask.
 */
const ANDROID_MASKS = [
  { name: "circle", kind: "circle" },
  { name: "squircle", kind: "rounded", cornerRadius: 0.42 },
  { name: "rounded-square", kind: "rounded", cornerRadius: 0.18 },
  { name: "square", kind: "rounded", cornerRadius: 0 },
];

/** Densities documented for the report; masks are scale invariant, so this is informational. */
const DENSITIES = [
  ["mdpi", 48],
  ["hdpi", 72],
  ["xhdpi", 96],
  ["xxhdpi", 144],
  ["xxxhdpi", 192],
];

/** Sum-of-channels above which a pixel counts as artwork rather than black padding. */
const CONTENT_LUMA_THRESHOLD = 60;
/** Android safe zone: artwork must fit a centered circle of diameter 80% of the icon. */
const SAFE_ZONE_RADIUS_RATIO = 0.4;

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const CHANNELS_BY_COLOR_TYPE = { 0: 1, 2: 3, 4: 2, 6: 4 };

/** Minimal PNG decoder: 8-bit, non-interlaced, grayscale/RGB/GA/RGBA. */
function decodePng(buffer) {
  if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error("not a PNG file");

  let offset = 8;
  let header = null;
  const idatChunks = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);

    if (type === "IHDR") {
      header = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
        interlace: data[12],
      };
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }

    offset += 12 + length;
  }

  if (!header) throw new Error("missing IHDR chunk");
  if (header.bitDepth !== 8) throw new Error(`unsupported bit depth ${header.bitDepth} (expected 8)`);
  if (header.interlace !== 0) throw new Error("interlaced PNGs are not supported");

  const channels = CHANNELS_BY_COLOR_TYPE[header.colorType];
  if (!channels) throw new Error(`unsupported color type ${header.colorType}`);

  const { width, height } = header;
  const raw = inflateSync(Buffer.concat(idatChunks));
  const stride = width * channels;
  const pixels = Buffer.alloc(stride * height);

  // Reverse the per-scanline PNG filters (spec section 9.2).
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const out = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x++) {
      const rawByte = line[x];
      const left = x >= channels ? out[x - channels] : 0;
      const up = prev ? prev[x] : 0;
      const upLeft = prev && x >= channels ? prev[x - channels] : 0;

      let value;
      switch (filter) {
        case 0:
          value = rawByte;
          break;
        case 1:
          value = rawByte + left;
          break;
        case 2:
          value = rawByte + up;
          break;
        case 3:
          value = rawByte + ((left + up) >> 1);
          break;
        case 4: {
          const p = left + up - upLeft;
          const dLeft = Math.abs(p - left);
          const dUp = Math.abs(p - up);
          const dUpLeft = Math.abs(p - upLeft);
          const predictor = dLeft <= dUp && dLeft <= dUpLeft ? left : dUp <= dUpLeft ? up : upLeft;
          value = rawByte + predictor;
          break;
        }
        default:
          throw new Error(`unknown PNG filter type ${filter}`);
      }
      out[x] = value & 0xff;
    }
  }

  return { width, height, channels, colorType: header.colorType, pixels };
}

function pixelAt(image, x, y) {
  const { channels, pixels, width } = image;
  const i = (y * width + x) * channels;
  if (channels === 1) return { r: pixels[i], g: pixels[i], b: pixels[i], a: 255 };
  if (channels === 2) return { r: pixels[i], g: pixels[i], b: pixels[i], a: pixels[i + 1] };
  if (channels === 3) return { r: pixels[i], g: pixels[i + 1], b: pixels[i + 2], a: 255 };
  return { r: pixels[i], g: pixels[i + 1], b: pixels[i + 2], a: pixels[i + 3] };
}

/** True when the point lies OUTSIDE the given mask shape. */
function isOutsideMask(mask, x, y, size) {
  const cx = size / 2;
  const cy = size / 2;

  if (mask.kind === "circle") {
    return Math.hypot(x - cx, y - cy) > size / 2;
  }

  const radius = mask.cornerRadius * size;
  if (radius <= 0) return false; // full-bleed square clips nothing

  // Outside only if beyond the rounded corner arc.
  const dx = Math.abs(x - cx) - (size / 2 - radius);
  const dy = Math.abs(y - cy) - (size / 2 - radius);
  if (dx <= 0 || dy <= 0) return false;
  return Math.hypot(dx, dy) > radius;
}

/** Collect artwork geometry: content pixel count, max radius from center, transparency. */
function analyze(image) {
  const { width, height } = image;
  const cx = width / 2;
  const cy = height / 2;
  let contentPixels = 0;
  let maxContentRadius = 0;
  let transparentPixels = 0;
  const contentPoints = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const { r, g, b, a } = pixelAt(image, x, y);
      if (a < 255) transparentPixels++;
      if (r + g + b > CONTENT_LUMA_THRESHOLD && a > 0) {
        contentPixels++;
        contentPoints.push(x + 0.5, y + 0.5);
        const radius = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
        if (radius > maxContentRadius) maxContentRadius = radius;
      }
    }
  }

  return { contentPixels, maxContentRadius, transparentPixels, contentPoints };
}

const errors = [];
const warnings = [];
const lines = [];

function loadIcon(file) {
  const path = join(PUBLIC_DIR, file);
  if (!existsSync(path)) {
    errors.push(`${file}: missing from public/`);
    return null;
  }
  try {
    return decodePng(readFileSync(path));
  } catch (error) {
    errors.push(`${file}: could not decode PNG (${error.message})`);
    return null;
  }
}

function checkDeclaredSize(file, image, declared) {
  if (image.width !== declared || image.height !== declared) {
    errors.push(`${file}: declared ${declared}x${declared} but file is ${image.width}x${image.height}`);
    return false;
  }
  return true;
}

// ---------------------------------------------------------------- manifest icons
if (!existsSync(MANIFEST)) {
  errors.push("public/manifest.webmanifest: missing");
} else {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
  } catch (error) {
    errors.push(`public/manifest.webmanifest: invalid JSON (${error.message})`);
  }

  const icons = manifest?.icons ?? [];
  if (icons.length === 0) errors.push("public/manifest.webmanifest: declares no icons");

  const maskableEntries = icons.filter((icon) => (icon.purpose ?? "any").includes("maskable"));
  if (maskableEntries.length === 0) {
    errors.push('public/manifest.webmanifest: no icon declares purpose "maskable"');
  }
  for (const required of [192, 512]) {
    if (!maskableEntries.some((icon) => icon.sizes === `${required}x${required}`)) {
      errors.push(`public/manifest.webmanifest: missing a ${required}x${required} maskable icon`);
    }
  }

  for (const icon of icons) {
    const file = String(icon.src ?? "").replace(/^\//, "");
    const declared = Number.parseInt(String(icon.sizes ?? "").split("x")[0], 10);
    const purpose = icon.purpose ?? "any";
    const image = loadIcon(file);
    if (!image) continue;
    if (!Number.isFinite(declared)) {
      errors.push(`${file}: manifest entry has no valid "sizes"`);
      continue;
    }
    if (!checkDeclaredSize(file, image, declared)) continue;

    if (!purpose.includes("maskable")) {
      lines.push(`  ok  ${file.padEnd(24)} ${declared}x${declared} purpose=${purpose}`);
      continue;
    }

    // -------- maskable-specific checks
    const { contentPixels, maxContentRadius, transparentPixels, contentPoints } = analyze(image);
    if (contentPixels === 0) {
      errors.push(`${file}: maskable icon appears blank (no artwork detected)`);
      continue;
    }
    if (transparentPixels > 0) {
      errors.push(
        `${file}: maskable icon has ${transparentPixels} non-opaque pixels; Android masks require a fully opaque icon`,
      );
    }

    const safeRadius = image.width * SAFE_ZONE_RADIUS_RATIO;
    if (maxContentRadius > safeRadius) {
      errors.push(
        `${file}: artwork reaches radius ${maxContentRadius.toFixed(1)}px but Android's safe zone is ` +
          `${safeRadius.toFixed(1)}px — scale the logo down so launcher masks cannot clip the gold frame`,
      );
    }

    // -------- gold-clipping check against each Android mask shape
    const clippedByMask = [];
    for (const mask of ANDROID_MASKS) {
      let clipped = 0;
      for (let i = 0; i < contentPoints.length; i += 2) {
        if (isOutsideMask(mask, contentPoints[i], contentPoints[i + 1], image.width)) clipped++;
      }
      if (clipped > 0) clippedByMask.push(`${mask.name} (${clipped}px)`);
    }
    if (clippedByMask.length > 0) {
      errors.push(`${file}: artwork is clipped by Android mask(s): ${clippedByMask.join(", ")}`);
    }

    const headroom = (((safeRadius - maxContentRadius) / safeRadius) * 100).toFixed(1);
    lines.push(
      `  ok  ${file.padEnd(24)} ${declared}x${declared} maskable  ` +
        `radius ${maxContentRadius.toFixed(1)}/${safeRadius.toFixed(1)}px (${headroom}% headroom), ` +
        `no clipping in ${ANDROID_MASKS.length} masks x ${DENSITIES.length} densities`,
    );
  }
}

// ------------------------------------------------- Apple touch + favicon sizes
for (const { file, size } of REQUIRED_STANDALONE) {
  const image = loadIcon(file);
  if (!image) continue;
  if (!checkDeclaredSize(file, image, size)) continue;
  if (file === "apple-touch-icon.png" || file.startsWith("icon-1")) {
    const { transparentPixels } = analyze(image);
    if (transparentPixels > 0) {
      warnings.push(
        `${file}: has ${transparentPixels} non-opaque pixels; iOS composites Apple touch icons on black/white and may show fringing`,
      );
    }
  }
  lines.push(`  ok  ${file.padEnd(24)} ${size}x${size}`);
}

// -------------------------------------------------------------------- report
console.log("PWA icon validation");
for (const line of lines) console.log(line);
for (const warning of warnings) console.warn(`  warn  ${warning}`);

if (errors.length > 0) {
  console.error(`\n${errors.length} icon problem(s) found:`);
  for (const error of errors) console.error(`  FAIL  ${error}`);
  console.error(
    "\nRegenerate the icon set (see scripts/README-icons.md) so every device shows the same crown logo.",
  );
  process.exit(1);
}

console.log(
  `\nAll icons valid: sizes match, maskable artwork inside the ${SAFE_ZONE_RADIUS_RATIO * 200}% safe zone, ` +
    `no gold clipping across ${ANDROID_MASKS.map((m) => m.name).join(", ")}.`,
);