import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { reachGoal } from "@/lib/analytics";
import { abs, asset } from "@/lib/site";

const FOUNDED = 1998;
const YEAR = new Date().getFullYear();

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Слаботочные системы в Воронеже: видеонаблюдение, СКУД, ОПС | Виксер" },
      {
        name: "description",
        content:
          "Монтаж слаботочных систем в Воронеже: видеонаблюдение (СОТ), охранно-пожарная сигнализация (ОПС), СКУД, СОУЭ, GPON, СКС. Лицензия МЧС. ООО «Фирма Виксер».",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: "ООО «Фирма Виксер»" },
      { property: "og:url", content: abs("/") },
      { property: "og:title", content: "ООО «Фирма Виксер» — слаботочные системы, Воронеж" },
      {
        property: "og:description",
        content:
          "Слаботочные системы в Воронеже: СОТ, НСС, ОПС, СОУЭ, СКУД, GPON, СКС. Наружка и внутрянка, линии до 220 В.",
      },
      { property: "og:image", content: abs("/og.jpg") },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "ООО «Фирма Виксер», Воронеж" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ООО «Фирма Виксер» — слаботочные системы, Воронеж" },
      {
        name: "twitter:description",
        content:
          "Слаботочные системы в Воронеже: СОТ, НСС, ОПС, СОУЭ, СКУД, GPON, СКС. Наружка и внутрянка, линии до 220 В.",
      },
      { name: "twitter:image", content: abs("/og.jpg") },
      { name: "geo.region", content: "RU-VOR" },
      { name: "geo.placename", content: "Воронеж" },
    ],
    links: [{ rel: "canonical", href: abs("/") }],
  }),
  component: Home,
});

const services = [
  {
    title: "Видеонаблюдение, СОТ",
    text: "Системы охранного телевидения: камеры, запись и просмотр. Кабель тянем и снаружи здания, и внутри.",
    icon: "cam",
  },
  {
    title: "Наружные сети связи, НСС",
    text: "Линии связи за пределами здания: кабель, вводы в дом, подключение к внутренней разводке.",
    icon: "out",
  },
  {
    title: "Охранно-пожарная сигнализация, ОПС",
    text: "Совмещённые шлейфы охраны и пожара. Пожарная составляющая — по лицензии МЧС № 8-Б/03418.",
    icon: "alarm",
  },
  {
    title: "СОУЭ",
    text: "Система оповещения и управления эвакуацией (СОУЭ): зоны, оповещатели, связь с сигнализацией.",
    icon: "horn",
  },
  {
    title: "СКУД",
    text: "Контроль и управление доступом: точки прохода, считыватели, учёт. Разблокировка при пожаре — вместе с ОПС.",
    icon: "reader",
  },
  {
    title: "Охранная сигнализация",
    text: "Охранные шлейфы отдельно от пожарных: датчики, приборы, вывод сигнала.",
    icon: "panel",
  },
  {
    title: "GPON",
    text: "Оптика до абонента: ввод, сварка, абонентская линия. Оператором связи мы не являемся — строим и монтируем сеть.",
    icon: "gpon",
  },
  {
    title: "СКС",
    text: "Структурированная кабельная система: медь и оптика, кроссы, маркировка портов. Наружные участки — в составе НСС.",
    icon: "sks",
  },
  {
    title: "Телефонизация",
    text: "Телефонные линии и кроссы. Наружная подводка и разводка по зданию.",
    icon: "phone",
  },
  {
    title: "Радиофикация",
    text: "Радиотрансляционная сеть объекта: стояки, абонентские линии, наружные участки.",
    icon: "radio",
  },
  {
    title: "Автоматизация",
    text: "АОВ — автоматизация общеобменной вентиляции. АВК и дымовые счётчики — отдельно: щиты, датчики и линии управления до 220 В.",
    icon: "auto",
  },
  {
    title: "МГН",
    text: "Системы для маломобильных групп населения: вызов помощи и доступность на путях движения.",
    icon: "mgn",
  },
] as const;

const projects: {
  title: string;
  place: string;
  note: string;
  tags: string;
  image: string;
}[] = [
  {
    title: "Онкодиспансер, новый корпус",
    place: "Медицинский объект, Воронеж",
    note: "Слаботочные системы нового корпуса.",
    tags: "медицина",
    image: "/img/obj-onko.webp",
  },
  {
    title: "Marriott",
    place: "пр-т Революции, 38",
    note: "Гостиница Marriott. На втором этаже здания — банк ДОМ.РФ.",
    tags: "гостиница · банк",
    image: "/img/obj-marriott.webp",
  },
  {
    title: "Складской комплекс",
    place: "Складской объект",
    note: "Наружные и внутренние слаботочные линии.",
    tags: "склад",
    image: "/img/obj-plant.webp",
  },
  {
    title: "Школа на Шишкова",
    place: "ул. Шишкова, Воронеж",
    note: "Школа №102. Здание строил ДСК.",
    tags: "образование · ДСК",
    image: "/img/obj-school.webp",
  },
];

function Icon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "alarm") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <path
          {...common}
          d="M40 18c12 0 20 9 20 20v6c0 6 3 9 6 11H14c3-2 6-5 6-11v-6c0-11 8-20 20-20z"
        />
        <circle {...common} cx="40" cy="36" r="7" />
        <path {...common} d="M28 58c2 6 7 9 12 9s10-3 12-9" />
        <path {...common} d="M22 16l-6-6M58 16l6-6" />
      </svg>
    );
  }
  if (name === "horn") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <path {...common} d="M18 34h10l28-14v40L28 46H18z" />
        <path {...common} d="M28 46v10a6 6 0 0 0 6 6h2" />
        <path {...common} d="M62 30c4 4 4 16 0 20M68 24c7 7 7 25 0 32" />
      </svg>
    );
  }
  if (name === "cam") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <path {...common} d="M14 30h34a8 8 0 0 1 8 8v8a8 8 0 0 1-8 8H22L14 62V30z" />
        <circle {...common} cx="32" cy="42" r="7" />
        <path {...common} d="M56 36l12-6v22l-12-6" />
      </svg>
    );
  }
  if (name === "reader") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <rect {...common} x="24" y="12" width="32" height="56" rx="4" />
        <circle {...common} cx="40" cy="32" r="6" />
        <path {...common} d="M34 46h12M36 52h8" />
        <path {...common} d="M40 26v3" />
      </svg>
    );
  }
  if (name === "panel") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <rect {...common} x="22" y="10" width="36" height="52" rx="4" />
        <rect {...common} x="30" y="18" width="20" height="14" rx="2" />
        <circle {...common} cx="40" cy="46" r="4" />
        <path {...common} d="M34 62h12" />
      </svg>
    );
  }
  if (name === "gpon") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <rect {...common} x="14" y="28" width="40" height="22" rx="3" />
        <path {...common} d="M54 34h8M54 40h10M54 46h8" />
        <circle {...common} cx="24" cy="39" r="2" />
        <path {...common} d="M30 39h16" />
      </svg>
    );
  }
  if (name === "sks") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <rect {...common} x="12" y="24" width="56" height="32" rx="3" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} {...common} x={18 + i * 6} y="32" width="3.2" height="10" rx="0.6" />
        ))}
        <path {...common} d="M18 50h44" />
      </svg>
    );
  }
  if (name === "out") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <path {...common} d="M16 54V28l16-10 16 10v26" />
        <path {...common} d="M48 40h16M56 32v16" />
        <path {...common} d="M22 54h20" />
      </svg>
    );
  }
  if (name === "phone") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <path
          {...common}
          d="M26 18h10l4 10-6 4a24 24 0 0 0 14 14l4-6 10 4v10c0 2-2 6-8 6C32 60 20 40 20 26c0-6 4-8 6-8z"
        />
      </svg>
    );
  }
  if (name === "radio") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <path {...common} d="M28 46a12 12 0 0 1 24 0" />
        <path {...common} d="M20 40a22 22 0 0 1 40 0" />
        <path {...common} d="M36 52h8l-2 12h-4z" />
        <circle {...common} cx="40" cy="46" r="2" />
      </svg>
    );
  }
  if (name === "auto") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <rect {...common} x="16" y="22" width="28" height="36" rx="2" />
        <path {...common} d="M22 32h16M22 40h16M22 48h10" />
        <circle {...common} cx="56" cy="34" r="8" />
        <path {...common} d="M56 30v4l3 2M48 52h16" />
      </svg>
    );
  }
  if (name === "mgn") {
    return (
      <svg viewBox="0 0 80 80" aria-hidden>
        <circle {...common} cx="40" cy="18" r="6" />
        <path {...common} d="M28 66l8-20h8l4 8h10" />
        <circle {...common} cx="32" cy="62" r="6" />
        <path {...common} d="M40 32v8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80" aria-hidden>
      <rect {...common} x="18" y="14" width="44" height="14" rx="2" />
      <rect {...common} x="18" y="33" width="44" height="14" rx="2" />
      <rect {...common} x="18" y="52" width="44" height="14" rx="2" />
      <circle {...common} cx="26" cy="21" r="1.4" fill="currentColor" />
      <circle {...common} cx="26" cy="40" r="1.4" fill="currentColor" />
      <circle {...common} cx="26" cy="59" r="1.4" fill="currentColor" />
    </svg>
  );
}

function Mini({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Home() {
  const [menu, setMenu] = useState(false);
  const [dialog, setDialog] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function openQuote(title = "Получить расчёт") {
    setSent(false);
    setDialog(title);
    reachGoal("open_quote");
  }

  const lastOutside = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function track(event: FocusEvent) {
      const el = event.target as HTMLElement;
      if (!el.closest?.(".dialog")) lastOutside.current = el;
    }
    document.addEventListener("focusin", track);
    return () => document.removeEventListener("focusin", track);
  }, []);

  // Пока открыто модальное окно, страница под ним не прокручивается.
  useEffect(() => {
    if (!dialog) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [dialog]);

  // Меню закрывается по Escape и по клику вне шапки.
  useEffect(() => {
    if (!menu) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenu(false);
    }
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest(".site-header")) setMenu(false);
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menu]);

  useEffect(() => {
    if (!dialog) return;
    const opener = lastOutside.current;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDialog(null);
        return;
      }
      if (event.key !== "Tab") return;
      const box = document.querySelector<HTMLElement>(".dialog");
      if (!box) return;
      const items = box.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])",
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !box.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !box.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [dialog]);

  return (
    <div>
      <a className="skip-link" href="#top">
        Перейти к содержанию
      </a>
      <header className="site-header">
        <div className="header-row">
          <a className="brand" href="#top">
            <img src={asset("/img/mark.webp")} alt="" width="160" height="105" />
            <span className="brand-name">
              <small>ООО ФИРМА</small>
              <strong>ВИКСЕР</strong>
            </span>
          </a>
          <nav className="nav" aria-label="Основное">
            <a href="#top">Главная</a>
            <a href="#about">О компании</a>
            <a href="#services">Услуги</a>
            <a href="#projects">Объекты</a>
            <a href="#licenses">Лицензии</a>
            <a href="#partners">Оборудование</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className="header-phone">
            <a href="tel:+74732552825" onClick={() => reachGoal("phone_click")}>
              +7 (473) 255-28-25
            </a>
            <span>г. Воронеж</span>
          </div>
          <button
            className="btn header-cta"
            type="button"
            onClick={() => openQuote()}
            aria-haspopup="dialog"
          >
            Получить расчёт
          </button>
          <button
            className="burger"
            type="button"
            aria-label={menu ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menu}
            aria-controls="mobile-nav"
            onClick={() => setMenu((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav
          id="mobile-nav"
          aria-label="Мобильное меню"
          className={menu ? "mobile-nav open" : "mobile-nav"}
        >
          {[
            ["#top", "Главная"],
            ["#about", "О компании"],
            ["#services", "Услуги"],
            ["#projects", "Объекты"],
            ["#licenses", "Лицензии"],
            ["#partners", "Оборудование"],
            ["#contacts", "Контакты"],
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div
            className="hero-photo"
            style={{ "--hero-image": `url(${asset("/img/hero-night.webp")})` } as CSSProperties}
          />
          <div className="hero-circuit" />
          <div className="shell hero-inner">
            <div>
              <img
                className="hero-logo"
                src={asset("/img/logo-420.webp")}
                srcSet={`${asset("/img/logo-420.webp")} 420w, ${asset("/img/logo.webp")} 840w`}
                sizes="(max-width: 680px) 74vw, 420px"
                alt="ООО Фирма ВИКСЕР"
                width="840"
                height="660"
              />
              <div className="hero-cta">
                <button
                  className="btn"
                  type="button"
                  onClick={() => openQuote()}
                  aria-haspopup="dialog"
                >
                  Получить расчёт →
                </button>
              </div>
            </div>
            <div>
              <h1>
                Комплексные инженерные системы безопасности для бизнеса
                <span>в Воронеже</span>
              </h1>
              <p className="hero-lead">
                Монтируем надёжные слаботочные системы в Воронеже: наружные и внутренние линии до
                220 В.
              </p>
              <div className="stats">
                <div className="stat">
                  <strong>{FOUNDED}</strong>
                  <span>первые объекты</span>
                </div>
                <div className="stat">
                  <strong>{YEAR - FOUNDED}</strong>
                  <span>лет работы</span>
                </div>
                <div className="stat">
                  <strong>12</strong>
                  <span>видов работ</span>
                </div>
                <div className="stat">
                  <strong>220</strong>
                  <span>вольт и ниже</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="band" id="about">
          <div className="shell">
            <h2 className="section-rule">О компании</h2>
            <p className="lead-note">
              Монтируем слаботочные системы в Воронеже: линии связи, сигнализацию, телевидение,
              доступ и автоматику. Директор — Щепилов Виктор Иванович.
            </p>
            <dl className="facts">
              <div>
                <dt>Наименование</dt>
                <dd>
                  ООО «Фирма Виксер». Полное: общество с ограниченной ответственностью фирма
                  «Виксер».
                </dd>
              </div>
              <div>
                <dt>Статус</dt>
                <dd>Действует. Город — Воронеж.</dd>
              </div>
              <div>
                <dt>Директор</dt>
                <dd>Щепилов Виктор Иванович.</dd>
              </div>
              <div>
                <dt>Регистрация</dt>
                <dd>15 июня 1998 года. ОГРН 1023601546870 присвоен 21 октября 2002 года.</dd>
              </div>
              <div>
                <dt>ИНН / КПП</dt>
                <dd>3663000385 / 366301001</dd>
              </div>
              <div>
                <dt>ОГРН / ОКПО</dt>
                <dd>1023601546870 / 10626841</dd>
              </div>
              <div>
                <dt>Адрес</dt>
                <dd>394029, Воронежская область, г. Воронеж, пр-т Ленинский, д. 3, корп. 2.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="band" id="services">
          <div className="shell">
            <h2 className="section-rule">Наши услуги</h2>
            <p className="lead-note">
              Всё, что ниже 220 В и идёт по проводам: и наружку, и внутрянку. Состав системы считаем
              по объекту.
            </p>
            <div className="cards">
              {services.map((s) => (
                <article className="card" key={s.title}>
                  <div className="icon-stage">
                    <Icon name={s.icon} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <button className="btn btn-sm" type="button" onClick={() => openQuote(s.title)}>
                    Заявка →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="shell">
            <h2 className="section-rule">Почему выбирают нас</h2>
            <div className="why">
              <div className="why-item">
                <div className="hex">
                  <Mini d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" />
                </div>
                <div>
                  <h3>Опыт</h3>
                  <p>
                    Работаем с 1998 года. Ведём объект от заявки и выезда до монтажа и пусконаладки.
                  </p>
                </div>
              </div>
              <div className="why-item">
                <div className="hex">
                  <Mini d="M12 12a4 4 0 1 0-4-4M4 20a8 8 0 0 1 16 0" />
                </div>
                <div>
                  <h3>Слаботочка</h3>
                  <p>
                    Наружные и внутренние линии до 220 В: связь, сигнализация, телевидение, доступ и
                    пусконаладка.
                  </p>
                </div>
              </div>
              <div className="why-item">
                <div className="hex">
                  <Mini d="M12 3l7 3v6c0 5-3 7-7 9-4-2-7-4-7-9V6z" />
                </div>
                <div>
                  <h3>Допуски</h3>
                  <p>Лицензия МЧС № 8-Б/03418 на монтаж средств пожарной безопасности.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="hex">
                  <Mini d="M14 7l3 3M4 20l4-1 9-9-3-3-9 9z" />
                </div>
                <div>
                  <h3>Оборудование</h3>
                  <p>
                    Работаем с Bolid, Hikvision, Dahua, PERCo, Sigur, Rubezh и TRASSIR. Марку
                    выбираем под задачу, а не «как в прошлом объекте».
                  </p>
                </div>
              </div>
              <div className="why-item">
                <div className="hex">
                  <Mini d="M6 15a6 6 0 0 1 12 0M12 15v3M9 21h6" />
                </div>
                <div>
                  <h3>График</h3>
                  <p>
                    Пн–пт, 8:00–17:00. На спецобъектах — до 19:00 и в субботу. Заявку с сайта
                    разбираем в эти часы и перезваниваем.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="band">
          <div className="shell">
            <h2 className="section-rule">Наш подход к работе</h2>
            <div className="steps">
              {[
                ["Заявка", "M7 3h8l2 2v16H7zM9 8h6M9 12h6"],
                ["Выезд инженера", "M12 12a3 3 0 1 0-3-3M5 19a7 7 0 0 1 14 0"],
                ["Расчёт", "M4 20l4-1 10-10-3-3L5 16z"],
                ["Согласование", "M5 12l5 5L20 7"],
                ["Монтаж", "M14 6l4 4M4 20l4-1 10-10-3-3z"],
                [
                  "Пусконаладка",
                  "M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM12 3v2M12 19v2M3 12h2M19 12h2",
                ],
              ].map(([label, d]) => (
                <div className="step" key={label}>
                  <div className="hex">
                    <Mini d={d} />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="projects">
          <div className="shell">
            <div className="section-head">
              <h2 className="section-rule">Объекты</h2>
              <button className="btn btn-sm" type="button" onClick={() => openQuote("Объект")}>
                Обсудить объект →
              </button>
            </div>
            <div className="projects">
              {projects.map((p) => (
                <article key={p.title} className="project">
                  <img
                    src={asset(p.image)}
                    srcSet={`${asset(p.image.replace(/\.webp$/, "-560.webp"))} 560w, ${asset(p.image)} 1000w`}
                    sizes="(max-width: 480px) 92vw, (max-width: 1100px) 45vw, 281px"
                    alt={p.title}
                    width="1000"
                    height="640"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    <p>
                      {p.place}
                      <br />
                      {p.note}
                    </p>
                    <span className="tags">{p.tags}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="licenses">
          <div className="shell">
            <h2 className="section-rule">Лицензии и коды</h2>
            <div className="cards">
              <article className="card">
                <h3>Лицензия МЧС</h3>
                <p>
                  № 8-Б/03418 от 5 ноября 2013 года. Монтаж, техническое обслуживание и ремонт
                  средств обеспечения пожарной безопасности зданий и сооружений. Выдана ГУ МЧС
                  России по Воронежской области.
                </p>
              </article>
              <article className="card">
                <h3>ОКВЭД 42.22.2</h3>
                <p>
                  Основной вид: строительство местных линий электропередачи и связи, включая
                  прокладку кабелей связи.
                </p>
              </article>
              <article className="card">
                <h3>ОКВЭД 43.21</h3>
                <p>Дополнительный вид: производство электромонтажных работ.</p>
              </article>
              <article className="card">
                <h3>Реестр МСП</h3>
                <p>
                  Малое предприятие. В реестре субъектов малого и среднего предпринимательства с 1
                  августа 2016 года.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="band" id="partners">
          <div className="shell">
            <h2 className="section-rule">Оборудование</h2>
            <p className="lead-note">
              Марки, которые ставим на объектах. Состав шкафа и камер считаем по проекту.
            </p>
            <div className="partners">
              <div className="partner">
                BOLID
                <small>СИСТЕМЫ БЕЗОПАСНОСТИ</small>
              </div>
              <div className="partner p-hik">HIKVISION</div>
              <div className="partner p-dahua">dahua</div>
              <div className="partner p-perco">PERCo</div>
              <div className="partner p-sigur">SIGUR</div>
              <div className="partner">RUBEZH</div>
              <div className="partner p-trassir">TRASSIR</div>
            </div>
          </div>
        </section>

        <section className="band" id="map">
          <div className="shell">
            <h2 className="section-rule">Как добраться</h2>
            <p className="lead-note">Левобережный район, индекс 394029.</p>
            <div className="map-frame">
              <img
                src={asset("/img/map.webp")}
                alt="Карта: Ленинский проспект, 3, корпус 2, Воронеж"
                width="1200"
                height="700"
                loading="lazy"
                decoding="async"
              />
              <div className="map-shade" aria-hidden />
              <div className="map-card">
                <strong>ООО «Фирма Виксер»</strong>
                <span>пр-т Ленинский, д. 3, корп. 2</span>
                <span>Воронеж</span>
              </div>
            </div>
            <p className="map-links">
              <a
                href="https://yandex.ru/maps/?text=%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6%2C%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%2C%203%D0%BA2"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс Карты
              </a>
              <a
                href="https://2gis.ru/voronezh/search/%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%203%20%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%202"
                target="_blank"
                rel="noreferrer"
              >
                2ГИС
              </a>
            </p>
            <p className="map-attr">Карта © участники OpenStreetMap</p>
          </div>
        </section>

        <section className="band" id="privacy">
          <div className="shell privacy">
            <h2 className="section-rule">Конфиденциальность</h2>
            <dl className="facts">
              <div>
                <dt>Кто получает данные</dt>
                <dd>
                  ООО «Фирма Виксер», ИНН 3663000385, пр-т Ленинский, д. 3, корп. 2, Воронеж.
                </dd>
              </div>
              <div>
                <dt>Зачем</dt>
                <dd>Чтобы перезвонить и подготовить расчёт по выбранной системе. Рассылок нет.</dd>
              </div>
              <div>
                <dt>Какие данные</dt>
                <dd>Имя и телефон. Почта — если сами её написали.</dd>
              </div>
              <div>
                <dt>Куда уходит заявка</dt>
                <dd>
                  Письмо открывается в вашей почте и уходит на vikser.vrn@ya.ru. Сайт копию не
                  сохраняет.
                </dd>
              </div>
              <div>
                <dt>Сколько храним</dt>
                <dd>Переписка остаётся в почте компании, пока идёт расчёт и работа по заявке.</dd>
              </div>
              <div>
                <dt>Кому ещё</dt>
                <dd>Третьим лицам не передаём. Исключение — если этого требует закон.</dd>
              </div>
            </dl>
            <p className="privacy-more">
              Полный текст — <Link to="/privacy">политика обработки персональных данных</Link>.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer" id="contacts">
        <div className="shell footer-grid">
          <div>
            <img
              className="foot-logo"
              src={asset("/img/logo-420.webp")}
              alt="ВИКСЕР"
              width="420"
              height="330"
            />
            <p>
              Инженерные системы безопасности
              <br />
              монтаж · пусконаладка
            </p>
            <p className="since">Работаем с 1998 года.</p>
          </div>
          <div>
            <h2>УСЛУГИ</h2>
            <ul>
              {services.map((s) => (
                <li key={s.title}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>КОМПАНИЯ</h2>
            <ul>
              <li>
                <a href="#about">О компании</a>
              </li>
              <li>
                <a href="#licenses">Лицензии и коды</a>
              </li>
              <li>
                <a href="#projects">Объекты</a>
              </li>
              <li>
                <a href="#partners">Оборудование</a>
              </li>
              <li>
                <a href="#map">Как добраться</a>
              </li>
              <li>
                <Link to="/privacy">Политика конфиденциальности</Link>
              </li>
              <li>
                <a href="#contacts">Контакты</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>КОНТАКТЫ</h2>
            <p className="contact-line">
              <MapPin className="contact-icon" aria-hidden />
              <span>Юридический: пр-т Ленинский, д. 3, корп. 2, Воронеж, 394029</span>
            </p>
            <p className="contact-line">
              <Phone className="contact-icon" aria-hidden />
              <a href="tel:+74732552825" onClick={() => reachGoal("phone_click")}>
                +7 (473) 255-28-25
              </a>
            </p>
            <p className="contact-line">
              <Phone className="contact-icon" aria-hidden />
              <a href="tel:+74732486720" onClick={() => reachGoal("phone_click")}>
                +7 (473) 248-67-20
              </a>
            </p>
            <p className="contact-line">
              <Mail className="contact-icon" aria-hidden />
              <a href="mailto:vikser.vrn@ya.ru" onClick={() => reachGoal("email_click")}>
                vikser.vrn@ya.ru
              </a>
            </p>
            <p className="contact-line">
              <Clock className="contact-icon" aria-hidden />
              <span>Пн–пт, 8:00–17:00. Спецобъекты — до 19:00 и сб.</span>
            </p>
          </div>
          <div>
            <h2>ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</h2>
            <QuoteForm compact topic="Консультация" onDone={() => undefined} />
          </div>
        </div>
        <div className="shell legal">
          <span suppressHydrationWarning>© {YEAR} ООО «Фирма Виксер»</span>
          <Link to="/privacy">Политика конфиденциальности</Link>
        </div>
      </footer>

      <div className="call-bar">
        <a
          className="btn btn-solid"
          href="tel:+74732552825"
          onClick={() => reachGoal("phone_click")}
        >
          <Phone className="contact-icon" aria-hidden />
          Позвонить
        </a>
        <button className="btn" type="button" onClick={() => openQuote()} aria-haspopup="dialog">
          Получить расчёт
        </button>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": abs("/#organization"),
            name: "ООО «Фирма Виксер»",
            legalName: "Общество с ограниченной ответственностью фирма «Виксер»",
            url: abs("/"),
            image: abs("/og.jpg"),
            description:
              "Монтаж слаботочных систем в Воронеже: видеонаблюдение, охранно-пожарная сигнализация, СКУД, СОУЭ, СКС, GPON.",
            taxID: "3663000385",
            email: "vikser.vrn@ya.ru",
            telephone: "+7-473-255-28-25",
            foundingDate: "1998-06-15",
            contactPoint: [
              { "@type": "ContactPoint", telephone: "+7-473-248-67-20", contactType: "customer service" },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "пр-т Ленинский, д. 3, корп. 2",
              addressLocality: "Воронеж",
              addressRegion: "Воронежская область",
              postalCode: "394029",
              addressCountry: "RU",
            },
            areaServed: { "@type": "City", name: "Воронеж" },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "08:00",
              closes: "17:00",
            },
            identifier: [
              { "@type": "PropertyValue", name: "ИНН", value: "3663000385" },
              { "@type": "PropertyValue", name: "КПП", value: "366301001" },
              { "@type": "PropertyValue", name: "ОГРН", value: "1023601546870" },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Слаботочные системы",
              itemListElement: services.map((s) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s.title, description: s.text },
              })),
            },
          }),
        }}
      />

      {dialog ? (
        <div className="dialog-back" role="presentation" onClick={() => setDialog(null)}>
          <div
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dlg-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="dlg-title">{dialog}</h3>
            {sent ? (
              <p className="ok" role="status">
                Письмо подготовлено. Отправьте его из почты, и мы перезвоним в рабочее время. Если
                почта не открылась, напишите на vikser.vrn@ya.ru или позвоните +7 (473) 255-28-25.
              </p>
            ) : (
              <>
                <p>Оставьте контакты — подготовим расчёт по выбранной системе.</p>
                <QuoteForm
                  autoFocus
                  topic={dialog}
                  onDone={() => {
                    setSent(true);
                  }}
                />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function QuoteForm({
  onDone,
  compact,
  topic,
  autoFocus,
}: {
  onDone: () => void;
  compact?: boolean;
  topic?: string;
  autoFocus?: boolean;
}) {
  const [done, setDone] = useState(false);
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") || "");
        const phone = String(data.get("phone") || "");
        const email = String(data.get("email") || "");
        const about = topic || "Консультация";
        const subject = encodeURIComponent(`Заявка: ${about}`);
        const body = encodeURIComponent(
          `Тема: ${about}\nИмя: ${name}\nТелефон: ${phone}\nПочта: ${email}`,
        );
        reachGoal("form_submit");
        window.location.href = `mailto:vikser.vrn@ya.ru?subject=${subject}&body=${body}`;
        setDone(true);
        onDone();
      }}
    >
      <input
        className="hp"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input
        name="name"
        required
        autoComplete="name"
        autoFocus={autoFocus}
        placeholder="Ваше имя"
        aria-label="Ваше имя"
      />
      <input
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        minLength={10}
        maxLength={30}
        placeholder="Телефон"
        aria-label="Телефон"
      />
      <input
        name="email"
        type="email"
        autoComplete="email"
        placeholder="E-mail"
        aria-label="E-mail"
      />
      <label className="consent-check">
        <input name="consent" type="checkbox" required />
        <span>
          Согласен на обработку персональных данных согласно{" "}
          <Link to="/privacy" target="_blank" rel="noreferrer">
            политике
          </Link>
        </span>
      </label>
      {done && compact ? (
        <p className="ok" role="status">
          Открываем почтовую программу с готовым письмом. Если она не открылась, напишите на
          vikser.vrn@ya.ru или позвоните +7 (473) 255-28-25.
        </p>
      ) : null}
      <button className={compact ? "btn btn-solid" : "btn"} type="submit">
        Отправить заявку
      </button>
    </form>
  );
}
