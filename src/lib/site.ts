import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

/**
 * Адрес сайта определяется сам, подстраиваясь под домен, на котором открыт.
 *
 * Порядок:
 * 1. VITE_SITE_URL — если задан при сборке (нужен, когда домен известен заранее);
 * 2. адрес текущего запроса на сервере (SSR);
 * 3. window.location.origin в браузере.
 *
 * Благодаря этому сайт работает на любом домене — beget, vercel, локально —
 * без правки кода: canonical, Open Graph и sitemap строятся от фактического адреса.
 */
const ENV_SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? "")
  .trim()
  .replace(/\/+$/, "");

export const getSiteUrl = createIsomorphicFn()
  .server(() => {
    if (ENV_SITE_URL) return ENV_SITE_URL;
    const request = getRequest();
    const url = new URL(request.url);
    return `${url.protocol}//${url.host}`;
  })
  .client(() => ENV_SITE_URL || window.location.origin);

/** Абсолютный адрес страницы — для canonical, og:url, og:image и JSON-LD. */
export function abs(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

/** Адрес для серверных ответов (robots.txt, sitemap.xml): переменная окружения или домен запроса. */
export function originFromRequest(request: Request): string {
  return ENV_SITE_URL || new URL(request.url).origin;
}

/**
 * Путь к файлу из public/ с учётом базового адреса сборки.
 * Нужен, когда сайт публикуется в подпапке (например /Vikser/ на GitHub Pages):
 * тогда "/img/logo.webp" превращается в "/Vikser/img/logo.webp", а на своём
 * домене остаётся "/img/logo.webp".
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

/** Идентификатор счётчика Яндекс.Метрики. Пока не задан — аналитика не грузится. */
export const METRIKA_ID = (import.meta.env.VITE_METRIKA_ID as string | undefined)?.trim() || "";
