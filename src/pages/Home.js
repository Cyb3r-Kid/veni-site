import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import CompanyCard from "../components/CompanyCard";
import Footer from "../components/Footer";
import DailyQuoteSection from "../components/DailyQuoteSection";
import { companies } from "../data/companies";
import { getStaticSectionImages } from "../data/imageRegistry";
import { scrollToSectionId } from "../utils/scrollToSection";

function Home() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const slides = useMemo(
    () => {
      const slideImages = getStaticSectionImages("home", "slider");
      return [
        {
          image: slideImages[0],
          title: t("home.slide_0_title"),
          desc: t("home.slide_0_desc"),
        },
        {
          image: slideImages[1],
          title: t("home.slide_1_title"),
          desc: t("home.slide_1_desc"),
        },
        {
          image: slideImages[2],
          title: t("home.slide_2_title"),
          desc: t("home.slide_2_desc"),
        },
      ];
    },
    [t]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollTo = (id) => {
    scrollToSectionId(id);
  };

  const aboutCards = useMemo(
    () => [
      { title: t("home.about_card_0_title"), desc: t("home.about_card_0_desc") },
      { title: t("home.about_card_1_title"), desc: t("home.about_card_1_desc") },
      { title: t("home.about_card_2_title"), desc: t("home.about_card_2_desc") },
    ],
    [t]
  );

  const whyPoints = useMemo(
    () => [t("home.why_point_0"), t("home.why_point_1"), t("home.why_point_2"), t("home.why_point_3")],
    [t]
  );

  const companies = [
  {
    id: "construction",
    title: "VENI Infra Projects Pvt Ltd",
    subtitle: "Construction",
    description:
      "End-to-end infrastructure execution for residential, industrial, and public works.",
    image: "/client/infra/banner.jpeg",
    button: "Explore Infrastructure",
  },
  {
    id: "trading",
    title: "M/s Veni In Projects",
    subtitle: "Trading & Material Supply",
    description:
      "Reliable procurement and supply of quality construction materials and equipment.",
    image: "/client/trading/banner.jpg",
    button: "View Supply Services",
  },
  {
    id: "investment",
    title: "Veni Investment Planner",
    subtitle: "Investment Advisory",
    description:
      "Goal-based financial planning, insurance guidance, and long-term wealth strategies.",
    image: "/client/invest/banner.jpg",
    button: "Plan Your Investments",
  },
  {
    id: "physio",
    title: "Veni Physiotherapy Life",
    subtitle: "Healthcare & Rehabilitation",
    description:
      "Personalized physiotherapy programs designed for recovery, mobility, and wellness.",
    image: "/client/physio/banner.jpg",
    button: "Discover Physiotherapy",
  },
];


  return (
    <div className="overflow-x-hidden bg-slate-50 text-gray-800">
      <Navbar type="home" />

      <section id="home" className="relative flex h-screen min-h-screen items-center overflow-hidden scroll-mt-24">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[index].image}
            src={slides[index].image}
            alt={slides[index].title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.02, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/40 to-emerald-900/65" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.28em] text-emerald-300">
            {t("home.hero_eyebrow")}
          </motion.p>
          <motion.h1
            key={slides[index].title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl"
          >
            {slides[index].title}
          </motion.h1>
          <motion.p
            key={slides[index].desc}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-white/85 md:text-lg"
          >
            {slides[index].desc}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollTo("companies")}
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-[1.02] hover:bg-emerald-600"
            >
              {t("home.cta_explore")}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="rounded-xl border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              {t("home.cta_enquiry")}
            </button>
          </motion.div>
        </div>
      </section>

      <DailyQuoteSection />

      <section id="companies" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl font-bold text-emerald-900 md:text-4xl"
          >
            {t("home.divisions_title")}
          </motion.h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-slate-600 md:text-base">{t("home.divisions_subtitle")}</p>
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 px-4 py-20 text-white scroll-mt-24 sm:px-6 lg:px-10 lg:py-24"
      >
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-green-200/10 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-3">
          {aboutCards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-100 bg-white p-8 md:p-10">
          <h2 className="text-3xl font-bold text-emerald-900 md:text-4xl">{t("home.about_us_title")}</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600 md:text-base">{t("home.about_us_body")}</p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-slate-700">{t("home.about_us_stat_0")}</div>
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-slate-700">{t("home.about_us_stat_1")}</div>
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-slate-700">{t("home.about_us_stat_2")}</div>
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-24 bg-white px-4 pb-10 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-100 bg-emerald-50/60 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-emerald-900 md:text-4xl">{t("home.why_title")}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {whyPoints.map((point) => (
              <div key={point} className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-emerald-700 to-emerald-600 p-8 text-white md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">{t("home.cta_section_title")}</h2>
          <p className="mt-4 max-w-2xl text-sm text-white/90 md:text-base">{t("home.cta_section_body")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/infra-projects"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              {t("home.cta_infra")} <FaArrowRight />
            </Link>
            <Link
              to="/trading"
              className="rounded-xl border border-white/45 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              {t("home.cta_trading")}
            </Link>
            <a
              href="https://wa.me/919894365298"
              className="rounded-xl border border-white/45 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              {t("common.whatsapp")}
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
