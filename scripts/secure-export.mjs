import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

// This operates only on Next's generated HTML, never on user-supplied markup.
const output = new URL("../out/", import.meta.url);
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : path;
  }))).flat();
}

const files = await walk(fileURLToPath(output));
const pages = files.filter((file) => file.endsWith(".html"));
assert(pages.length > 0, "No HTML exported");
for (const file of pages) {
  let html = await readFile(file, "utf8");
  html = html.replace(/<meta http-equiv="Content-Security-Policy" content="[^"]*">/g, "");
  const hashes = new Set();
  for (const [, attributes, script] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc=/.test(attributes)) {
      assert(!/\bsrc=["'](?:https?:)?\/\//i.test(attributes), "Unexpected external script");
    } else {
      hashes.add("'sha256-" + createHash("sha256").update(script).digest("base64") + "'");
    }
  }
  assert(!/<[^>]+\son\w+=/i.test(html), "Inline event handler found");
  assert(!/(?:src|href)=["']http:\/\//i.test(html), "Insecure HTTP resource found");
  const policy = [
    "default-src 'self'",
    "script-src 'self' " + [...hashes].join(" "),
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'", // Next styles and GSAP transforms.
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "frame-src 'none'",
    "form-action 'none'", // Contact opens mailto; no HTTP submission.
  ].join("; ");
  assert(html.includes("<head>"), "Missing document head");
  html = html.replace("<head>", '<head><meta http-equiv="Content-Security-Policy" content="' + policy + '">');
  await writeFile(file, html);
}

// Guardrails against accidentally shipping huge assets or source maps.
assert(!files.some((file) => file.endsWith(".map")), "Public source map found");
const imageFiles = files.filter((file) => /\.(webp|png|jpe?g)$/i.test(file));
let imageBytes = 0;
for (const file of imageFiles) {
  const bytes = (await readFile(file)).length;
  assert(bytes <= 250_000, "Image exceeds 250 kB: " + file);
  imageBytes += bytes;
}
let scriptGzipBytes = 0;
for (const file of files.filter((file) => file.endsWith(".js"))) {
  scriptGzipBytes += gzipSync(await readFile(file)).length;
}
assert(imageBytes <= 1_000_000, "Images exceed 1 MB total");
assert(scriptGzipBytes <= 500_000, "JavaScript exceeds 500 kB gzip total");
console.log("Verified " + pages.length + " protected pages; images " +
  Math.round(imageBytes / 1000) + " kB; all JS " + Math.round(scriptGzipBytes / 1000) + " kB gzip.");
