import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main className="nf">
      <div className="nf-grid" aria-hidden />
      <div className="nf-scan" aria-hidden />
      <div className="nf-glow" aria-hidden />

      <div className="nf-inner">
        <Link to="/" className="nf-brand" aria-label="ВИКСЕР, на главную">
          <img src="/img/logo.webp" alt="ООО Фирма ВИКСЕР" width="840" height="660" />
        </Link>

        <div className="nf-screen" role="img" aria-label="Ошибка 404: сигнал потерян">
          <div className="nf-rec">
            <i /> REC · CAM 404
          </div>
          <div className="nf-code" aria-hidden>
            <span>4</span>
            <span className="nf-zero">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle className="nf-eye" cx="40" cy="40" r="4" fill="currentColor" />
                <path
                  className="nf-sweep"
                  d="M40 40 L40 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span>4</span>
          </div>
          <div className="nf-noise" aria-hidden />
        </div>

        <h1>Сигнал потерян</h1>
        <p>Такой страницы нет или она переехала. Вернитесь на главную: там все системы на связи.</p>

        <div className="nf-actions">
          <Link to="/" className="btn btn-solid">
            На главную
          </Link>
          <a className="btn" href="tel:+74732552825">
            +7 (473) 255-28-25
          </a>
        </div>
      </div>
    </main>
  );
}
