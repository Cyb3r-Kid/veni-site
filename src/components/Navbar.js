import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { scrollToSectionId } from "../utils/scrollToSection";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { useToast } from "./ToastProvider";

const NAV_LINKS = {
  home: [
    { id: "home" },
    { id: "daily-quote" },
    { id: "companies" },
    { id: "about" },
    { id: "why" },
    { id: "contact" },
  ],
  infra: [
    { id: "home" },
    { id: "about" },
    { id: "services" },
    { id: "certifications" },
    { id: "projects" },
    { id: "why" },
    { id: "contact" },
  ],
  trading: [
    { id: "about" },
    { id: "products" },
    { id: "transport" },
    { id: "equipment" },
    { id: "why" },
    { id: "contact" },
  ],
  physio: [
    { id: "about" },
    { id: "treatments" },
    { id: "exercises" },
    { id: "why" },
    { id: "contact" },
  ],
  investment: [
    { id: "about" },
    { id: "services" },
    { id: "benefits" },
    { id: "why" },
    { id: "contact" },
  ],
};

function Navbar({ type = "home" }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isAdmin } = useAuth();
  const { pushToast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  const links = useMemo(() => NAV_LINKS[type] || NAV_LINKS.home, [type]);

  const scrollToSection = (id) => {
    const performScroll = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollToSectionId(id);
        });
      });
    };

    if (open) {
      setOpen(false);
      performScroll();
      return;
    }

    scrollToSectionId(id);
  };

  useEffect(() => {
    const observers = [];

    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(link.id);
          });
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0.05 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [links]);

  const linkLabel = (id) => {
    if (id === "daily-quote") return "Daily Quote";
    return t(`nav.${type}.${id}`);
  };

  const handleAuthClick = async () => {
    if (isAdmin) {
      try {
        await logoutUser();
        pushToast({ title: "Logged out successfully." });
        navigate("/", { replace: true });
      } catch (error) {
        pushToast({ title: error.message || "Unable to log out.", tone: "error" });
      }
      return;
    }

    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 z-[999] w-full border-b border-emerald-100 bg-white/90 shadow-sm backdrop-blur-xl"
    >
      <div className="flex h-16 items-center justify-between gap-2 px-4 sm:px-6 lg:px-10">
        <Link to="/" className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <img
            src="/logo.png"
            alt={t("navbar.brand")}
            className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11"
          />
          <span className="truncate text-base font-bold tracking-wide text-emerald-700 transition duration-300 group-hover:text-emerald-600 sm:text-xl">
            {t("navbar.brand")}
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex lg:gap-6">
          <nav className="flex items-center gap-4 text-sm font-medium lg:gap-6">
            {links.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`rounded-full px-3 py-2 transition-all duration-200 ${
                  activeId === item.id
                    ? "bg-emerald-50 text-emerald-700 shadow-sm"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                {linkLabel(item.id)}
              </button>
            ))}
          </nav>

          <div
            className="flex items-center gap-0.5 rounded-lg border border-emerald-200 bg-emerald-50/80 p-0.5 text-xs font-semibold"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              className={`rounded-md px-2 py-1 transition ${
                i18n.language?.startsWith("en")
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-emerald-700 hover:bg-white/60"
              }`}
            >
              {t("navbar.lang_en")}
            </button>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("ta")}
              className={`rounded-md px-2 py-1 transition ${
                i18n.language?.startsWith("ta")
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-emerald-700 hover:bg-white/60"
              }`}
            >
              {t("navbar.lang_ta")}
            </button>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="whitespace-nowrap rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-emerald-600"
          >
            {t("navbar.enquiry")}
          </button>
          <button
            type="button"
            onClick={handleAuthClick}
            className="whitespace-nowrap rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
          >
            {isAdmin ? "Logout" : "Login"}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center gap-0.5 rounded-lg border border-emerald-200 bg-emerald-50/80 p-0.5 text-[10px] font-semibold">
            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              className={`rounded px-1.5 py-0.5 ${
                i18n.language?.startsWith("en") ? "bg-emerald-600 text-white shadow-md" : "text-emerald-700"
              }`}
            >
              {t("navbar.lang_en")}
            </button>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("ta")}
              className={`rounded px-1.5 py-0.5 ${
                i18n.language?.startsWith("ta") ? "bg-emerald-600 text-white shadow-md" : "text-emerald-700"
              }`}
            >
              {t("navbar.lang_ta")}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="shrink-0 text-2xl text-emerald-700 transition hover:scale-110"
            aria-label="Menu"
          >
            {open ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto border-t border-emerald-100 bg-white px-4 py-4 text-sm shadow-md md:hidden">
          {links.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`rounded-lg px-2 py-1 text-left transition-colors duration-200 ${
                activeId === item.id ? "bg-emerald-50 font-semibold text-emerald-700" : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              {linkLabel(item.id)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="mt-1 rounded-lg bg-emerald-500 py-2 text-sm text-white transition hover:bg-emerald-600"
          >
            {t("navbar.enquiry")}
          </button>
          <button
            type="button"
            onClick={handleAuthClick}
            className="rounded-lg border border-emerald-200 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
          >
            {isAdmin ? "Logout" : "Login"}
          </button>
        </div>
      ) : null}
    </motion.header>
  );
}

export default Navbar;
