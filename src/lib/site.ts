/**
 * Базовый адрес сайта. Значение приходит из VITE_SITE_URL (задаётся в Vercel).
 * Фолбэк нужен, чтобы canonical и Open Graph никогда не оставались
 * относительными: соцсети и поисковики понимают только абсолютный URL.
 */
const FALLBACK_SITE_URL = "https://vikser.ru";

const RAW_SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim();

export const SITE_URL = (RAW_SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, "");

/** Идентификатор счётчика Яндекс.Метрики. Пока не задан — аналитика не грузится. */
export const METRIKA_ID = (import.meta.env.VITE_METRIKA_ID as string | undefined)?.trim() || "";

export function abs(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
