import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NotFound } from "@/components/not-found";
import { initAnalytics } from "@/lib/analytics";
import { asset, METRIKA_ID } from "@/lib/site";
import appCss from "../styles.css?url";
import manropeCyrillic from "@/fonts/manrope-cyrillic.woff2?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#05060a" },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: asset("/favicon.svg") },
      { rel: "icon", type: "image/png", sizes: "32x32", href: asset("/favicon-32.png") },
      { rel: "icon", type: "image/x-icon", href: asset("/favicon.ico"), sizes: "16x16 32x32 48x48" },
      { rel: "apple-touch-icon", href: asset("/apple-touch-icon.png") },
      { rel: "manifest", href: asset("/manifest.webmanifest") },
      {
        rel: "preload",
        href: manropeCyrillic,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: asset("/img/hero-night.webp"),
        as: "image",
        type: "image/webp",
        fetchPriority: "high",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootDocument,
});

function CookieNotice() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!METRIKA_ID) return;
    setHidden(localStorage.getItem("cookie-consent") === "1");
  }, []);

  if (!METRIKA_ID || hidden) return null;

  return (
    <div className="cookie" role="note" aria-label="Использование cookie">
      <p>
        Сайт использует cookie только для статистики. Продолжая просмотр, вы соглашаетесь с этим.{" "}
        <a href="/privacy">Подробнее</a>
      </p>
      <button
        type="button"
        className="btn btn-sm btn-solid"
        onClick={() => {
          localStorage.setItem("cookie-consent", "1");
          setHidden(true);
        }}
      >
        Понятно
      </button>
    </div>
  );
}

function RootDocument() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <CookieNotice />
        <Scripts />
      </body>
    </html>
  );
}
