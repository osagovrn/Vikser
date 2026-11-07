import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const securityHeaders = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "SAMEORIGIN",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "strict-transport-security": "max-age=31536000; includeSubDomains",
};

export default defineConfig(({ command, isPreview, mode }) => {
  // `vite build --mode static` дополнительно рендерит страницы в HTML:
  // из них scripts/build-static.mjs собирает сайт для хостинга без Node.
  const isStatic = mode === "static";

  // GitHub Pages для проектного репозитория отдаёт сайт из подпапки /<репозиторий>/.
  // Если у репозитория свой домен — base остаётся "/".
  const base = (process.env.VITE_BASE_PATH || "/").replace(/\/?$/, "/");
  const baseNoSlash = base.replace(/\/$/, "");

  const prerender = isStatic
    ? {
        prerender: {
          routes:
            base === "/"
              ? ["/", "/privacy", "/404"]
              : [`${base}`, `${base}privacy`, `${base}404`],
          crawlLinks: true,
          failOnError: true,
        },
      }
    : {};

  return {
    base,
    server: { host: "0.0.0.0", port: 8080 },
    preview: { host: "127.0.0.1", port: 8081 },
    resolve: { tsconfigPaths: true },
    plugins: [
      tailwindcss(),
      tanstackStart({
        router: base === "/" ? {} : { basepath: baseNoSlash },
      }),
      ...(command === "build" || isPreview
        ? [
            nitro({
              preset: "vercel",
              ...prerender,
              routeRules: {
                "/img/**": { headers: { "cache-control": "public, max-age=2592000" } },
                "/fonts/**": {
                  headers: { "cache-control": "public, max-age=31536000, immutable" },
                },
                "/assets/**": {
                  headers: { "cache-control": "public, max-age=31536000, immutable" },
                },
                "/**": { headers: securityHeaders },
              },
            }),
          ]
        : []),
      viteReact(),
    ],
  };
});
