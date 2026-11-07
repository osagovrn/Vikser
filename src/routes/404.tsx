import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/not-found";

/**
 * Отдельный маршрут для статической сборки: из него собирается файл 404.html,
 * который GitHub Pages (и обычные хостинги) отдают на несуществующие адреса.
 * Заголовок и noindex задаёт сам компонент NotFound — дублировать их в head нельзя,
 * иначе в HTML окажется два <title>.
 */
export const Route = createFileRoute("/404")({
  component: NotFound,
});
