import { createFileRoute } from "@tanstack/react-router";
import { originFromRequest } from "@/lib/site";

const PAGES = ["/", "/privacy"];
const BUILD_DATE = "2026-11-07";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = originFromRequest(request);
        const urls = PAGES.map((path) => {
          const priority = path === "/" ? "1.0" : "0.3";
          return `  <url>
    <loc>${origin}${path}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
        }).join("\n");

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
