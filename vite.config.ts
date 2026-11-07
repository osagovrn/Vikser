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
  // `vite build --mode static` дополнительно рендерит страницы в HTML —
  // из готовых файлов собирается сайт для хостинга без Node
  // (GitHub Pages, обычный виртуальный хостинг).
  const isStatic = mode === "static";

  return {
    server: { host: "0.0.0.0", port: 8080 },
    preview: { host: "127.0.0.1", port: 8081 },
    resolve: { tsconfigPaths: true },
    plugins: [
      tailwindcss(),
      tanstackStart(),
      ...(command === "build" || isPreview
        ? [
            nitro({
              preset: "vercel",
              ...(isStatic
                ? {
                    prerender: {
                      routes: ["/", "/privacy", "/404"],
                      crawlLinks: true,
                      failOnError: true,
                    },
                  }
                : {}),
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
