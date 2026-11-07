import { METRIKA_ID } from "@/lib/site";

/** Декларация типа для счётчика Метрики. */
declare global {
  interface Window {
    ym?: ((id: number, action: string, ...args: unknown[]) => void) & { a?: unknown[][] };
  }
}

/**
 * Отправка цели в Метрику. Если счётчик не подключён (нет VITE_METRIKA_ID),
 * вызовы молча игнорируются — код не ломается и ничего не отправляет.
 */
export function reachGoal(name: string): void {
  if (!METRIKA_ID || typeof window === "undefined") return;
  window.ym?.(Number(METRIKA_ID), "reachGoal", name);
}

/**
 * Подключает счётчик Метрики. Вызывается один раз при монтировании корня.
 * Пока VITE_METRIKA_ID не задан, на сайте нет ни счётчика, ни cookie.
 */
export function initAnalytics(): void {
  if (!METRIKA_ID || typeof document === "undefined") return;
  if (document.getElementById("ym-counter")) return;

  const id = Number(METRIKA_ID);

  // Очередь вызовов до загрузки tag.js — стандартный приём Метрики.
  if (!window.ym) {
    const stub = ((...args: unknown[]) => {
      const self = stub;
      self.a = self.a ?? [];
      self.a.push(args);
    }) as NonNullable<Window["ym"]>;
    stub.a = [];
    window.ym = stub;
  }

  const script = document.createElement("script");
  script.id = "ym-counter";
  script.async = true;
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  document.head.appendChild(script);

  window.ym?.(id, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
  });

  const noscript = document.createElement("noscript");
  const img = document.createElement("img");
  img.src = `https://mc.yandex.ru/watch/${id}`;
  img.alt = "";
  img.style.position = "absolute";
  img.style.left = "-9999px";
  noscript.appendChild(img);
  document.body.appendChild(noscript);
}
