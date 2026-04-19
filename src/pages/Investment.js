import { useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import SectionImageCard from "../components/SectionImageCard";
import { getStaticImage, getStaticSectionImages } from "../data/imageRegistry";

function Investment() {
  const { t } = useTranslation();

  const services = useMemo(() => t("investment.services", { returnObjects: true }), [t]);

  const benefits = useMemo(
    () => [t("investment.benefit_0"), t("investment.benefit_1"), t("investment.benefit_2"), t("investment.benefit_3")],
    [t]
  );

  const gallery = useMemo(
  () => [
    "/client/invest/i2.jpg",
    "/client/invest/i3.jpg",
    "/client/invest/i4.jpg",
  ],
  []
);


  return (
    <div className="overflow-x-hidden bg-slate-50 text-slate-800">
      <Navbar type="investment" />
      <section id="home" className="relative flex h-screen min-h-screen items-center overflow-hidden scroll-mt-24">
        <img src="/client/invest/i1.jpg" alt={t("investment.hero_title")} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-emerald-950/50 to-emerald-900/62" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">{t("investment.hero_eyebrow")}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-6xl">{t("investment.hero_title")}</h1>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:grid-cols-[220px_1fr]">
          <img src={getStaticImage("investment", "advisor")} alt={t("investment.about_title")} className="h-52 w-52 rounded-2xl object-cover" />
          <div>
            <h2 className="text-3xl font-bold text-emerald-900">{t("investment.about_title")}</h2>
            <p className="mt-1 text-sm font-medium text-emerald-700">{t("investment.about_credentials")}</p>
            <p className="mt-4 text-sm text-slate-600">{t("investment.about_body")}</p>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-emerald-900">{t("investment.services_title")}</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {Array.isArray(services) &&
              services.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6"
                >
                  <p className="font-medium text-emerald-800">{item}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-emerald-900">{t("investment.gallery_title")}</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((img, index) => (
  <img
    key={index}
    src={img}
    alt=""
    className="w-full h-64 object-cover rounded-xl shadow-md"
  />
))}

          </div>
        </div>
      </section>

      <section id="benefits" className="scroll-mt-24 bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-100 bg-white p-8">
          <h2 className="text-3xl font-bold text-emerald-900">{t("investment.benefits_title")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {benefits.map((text) => (
              <p key={text} className="rounded-xl bg-emerald-50 p-4 text-sm text-slate-700">
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-24 bg-emerald-900 px-4 py-16 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-md">
          <h2 className="text-3xl font-bold">{t("investment.why_title")}</h2>
          <p className="mt-4 max-w-3xl text-sm text-white/85">{t("investment.why_body")}</p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-white px-4 pb-20 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-600 p-8 text-white"
          >
            <h2 className="text-3xl font-bold">{t("investment.contact_title")}</h2>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <FaPhoneAlt /> {t("investment.contact_intro")}
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope /> {t("investment.contact_email")}
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt /> {t("investment.contact_address")}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+919894365298"
                className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:scale-105"
              >
                {t("common.call_now")}
              </a>
              <a
                href="https://wa.me/919894365298"
                className="rounded-xl border border-white/40 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {t("common.whatsapp")}
              </a>
            </div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-emerald-900">{t("investment.form_title")}</h3>
            <div className="mt-5 space-y-4">
              <input
                className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={t("common.placeholder_name")}
              />
              <input
                className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={t("common.placeholder_phone")}
              />
              <textarea
                rows="4"
                className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={t("common.placeholder_financial_goal")}
              />
              <button type="button" className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                {t("common.submit_request")}
              </button>
            </div>
          </motion.form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Investment;
