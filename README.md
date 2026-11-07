# Виксер: сайт компании

Одностраничный сайт ООО «Фирма Виксер» (Воронеж). Стек: TanStack Start, React 19, Tailwind 4, Vite, SSR через Nitro, деплой на Vercel.

## Запуск

    npm install
    npm run dev      # http://localhost:8080
    npm run build    # сборка в .vercel/output
    npm run preview  # локальный просмотр собранной версии
    npm run typecheck
    npm run lint

## Переменные окружения

| Переменная | Зачем | По умолчанию |
|---|---|---|
| `VITE_SITE_URL` | Абсолютные canonical, og:url, og:image, sitemap | `https://vikser.ru` |
| `VITE_METRIKA_ID` | Номер счётчика Яндекс.Метрики | не задан → аналитика не грузится |

Задаются в Vercel → Settings → Environment Variables (Production и Preview).
Пока `VITE_METRIKA_ID` пуст, на сайте нет ни счётчика, ни cookie, ни баннера — это нормально для локальной разработки.

## Структура

- `src/routes/index.tsx` — главная страница: шапка, 12 услуг, преимущества, этапы, объекты, лицензии, карта, политика, подвал, форма в модальном окне.
- `src/routes/privacy.tsx` — политика обработки персональных данных.
- `src/routes/__root.tsx` — общий каркас документа, шрифты, иконки, cookie-уведомление.
- `src/lib/site.ts` — адрес сайта и номер счётчика.
- `src/lib/analytics.ts` — подключение Метрики и цели.
- `src/styles.css` — все стили (дизайн-система + адаптив).

`src/routeTree.gen.ts` генерируется автоматически при сборке, но лежит в репозитории: без него `npm run typecheck` падает на свежем клоне.

## Заявки

Форма не отправляет данные на сервер: она открывает почтовую программу с готовым письмом на `vikser.vrn@ya.ru`. Сайт ничего не сохраняет — это указано в политике.

Цели в Метрике: `open_quote`, `form_submit`, `phone_click`, `email_click`.

## Тексты

Тексты услуг, объектов и реквизитов — в начале `src/routes/index.tsx` (массивы `services` и `projects`). Менять только там, вёрстку не трогать.

## Деплой

Vercel подхватывает `.vercel/output` (Build Output API). Сборка — `npm run build`.
Кэширование статики и security-заголовки заданы в `vite.config.ts` (`nitro.routeRules`).
