import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-emerald-950 px-4 py-10 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold">{t("footer.brand")}</h3>
          <p className="mt-3 text-sm text-white/75">{t("footer.tagline")}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
            {t("footer.core_divisions")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <Link to="/infra-projects#home" className="transition hover:text-emerald-200">
                {t("footer.division_infra")}
              </Link>
            </li>
            <li>
              <Link to="/trading#home" className="transition hover:text-emerald-200">
                {t("footer.division_trading")}
              </Link>
            </li>
            <li>
              <Link to="/physio#home" className="transition hover:text-emerald-200">
                {t("footer.division_physio")}
              </Link>
            </li>
            <li>
              <Link to="/investment#home" className="transition hover:text-emerald-200">
                {t("footer.division_investment")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
            {t("footer.social")}
          </h4>
          <div className="mt-3 flex items-center gap-4 text-white/80">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 p-2 text-lg transition hover:-translate-y-0.5 hover:text-emerald-200"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/919894365298"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 p-2 text-lg transition hover:-translate-y-0.5 hover:text-emerald-200"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 w-full max-w-7xl border-t border-white/15 pt-6 text-center text-xs text-white/70">
        {t("footer.copyright")}
      </p>
    </footer>
  );
}

export default Footer;
