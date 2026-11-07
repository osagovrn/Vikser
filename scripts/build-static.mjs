// Собирает папку dist-static — готовый сайт для хостинга без Node
// (GitHub Pages, обычный виртуальный хостинг с загрузкой файлов по FTP).
//
// Запускается после `vite build --mode static`.
// Домен берётся из VITE_SITE_URL (или SITE_URL); без него метаданные будут
// указывать на example.com, поэтому для боевой сборки переменную нужно задать.

import { cp, mkdir, readdir, rm, writeFile, readFile, rename } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, ".vercel", "output", "static");
const out = join(root, "dist-static");

const rawDomain = (process.env.VITE_SITE_URL || process.env.SITE_URL || "").trim();
const siteUrl = (rawDomain || "https://example.com").replace(/\/+$/, "");
const isPlaceholder = !rawDomain;

const PAGES = [
  { path: "/", priority: "1.0" },
  { path: "/privacy", priority: "0.3" },
];

if (!existsSync(join(src, "index.html"))) {
  console.error("Нет .vercel/output/static/index.html — сначала выполните: vite build --mode static");
  process.exit(1);
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(src, out, { recursive: true });

// 404.html: GitHub Pages отдаёт его на несуществующие адреса
const notFoundDir = join(out, "404");
if (existsSync(join(notFoundDir, "index.html"))) {
  await rename(join(notFoundDir, "index.html"), join(out, "404.html"));
  await rm(notFoundDir, { recursive: true, force: true });
}

// GitHub Pages не должен прогонять файлы через Jekyll
await writeFile(join(out, ".nojekyll"), "");

await writeFile(
  join(out, "robots.txt"),
  `User-agent: *
Allow: /
Disallow: /404

Sitemap: ${siteUrl}/sitemap.xml
`,
);

const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.map(
  (p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
).join("\n");

await writeFile(
  join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
);

// Проверка: все абсолютные ссылки из HTML должны существовать в сборке
const htmlFiles = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}
await walk(out);

const missing = new Set();
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const ref = match[1];
    if (ref.startsWith("//")) continue;
    const target = join(out, decodeURIComponent(ref.split("?")[0]));
    const asDir = join(target, "index.html");
    if (!existsSync(target) && !existsSync(asDir)) missing.add(ref);
  }
}

const size = (await readdir(out, { recursive: true })).length;
console.log(`dist-static: ${size} файлов, домен ${siteUrl}${isPlaceholder ? " (ЗАГЛУШКА)" : ""}`);
if (isPlaceholder) {
  console.log("! VITE_SITE_URL не задан: canonical, sitemap и CNAME указывают на example.com");
}
if (missing.size) {
  console.error("битые ссылки в HTML:", [...missing].join(", "));
  process.exit(1);
}
console.log("все ссылки в HTML разрешаются");
