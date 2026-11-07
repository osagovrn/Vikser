import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/not-found";

/**
 * Отдельный маршрут для статической сборки: из него собирается файл 404.html,
 * который GitHub Pages (и обычные хостинги) отдают на несуществующие адреса.
 * В серверном режиме эта страница не нужна — работает notFoundComponent.
 */
export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      { title: "Страница не найдена — Виксер" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFound,
});
