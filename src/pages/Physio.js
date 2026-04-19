import { useMemo } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import SectionImageCard from "../components/SectionImageCard";
import { getStaticImage, getStaticSectionImages } from "../data/imageRegistry";

function Physio() {
  const { t } = useTranslation();

  const treatments = useMemo(() => t("physio.treatments", { returnObjects: true }), [t]);
  const exercises = useMemo(() => t("physio.exercises", { returnObjects: true }), [t]);
  const processSteps = useMemo(() => t("physio.process_steps", { returnObjects: true }), [t]);
  const benefits = useMemo(() => t("physio.benefits", { returnObjects: true }), [t]);
  const testimonials = useMemo(() => t("physio.testimonials", { returnObjects: true }), [t]);

  const whyItems = useMemo(
    () => [t("physio.why_0"), t("physio.why_1"), t("physio.why_2"), t("physio.why_3")],
    [t]
  );

const gallery = useMemo(
  () => [
    "/client/physio/p3.jpg",
    "/client/physio/p4.jpg",
    "/client/physio/p5.jpg",
  ],
  []
);


  return (
    <div className="overflow-x-hidden bg-slate-50 text-slate-800">
      <Navbar type="physio" />
      <section id="home" className="relative flex h-screen min-h-screen items-center overflow-hidden scroll-mt-24">
        <img src="/client/physio/p1.jpg" alt={t("physio.hero_title")} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/72 via-emerald-900/45 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">{t("physio.hero_eyebrow")}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-6xl">{t("physio.hero_title")}</h1>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-emerald-900">{t("physio.about_title")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{t("physio.about_p1")}</p>
            <p className="mt-3 text-sm text-slate-600">{t("physio.about_p2")}</p>
          </div>
          <div className="group relative overflow-hidden rounded-3xl">
            <img
              src="/client/physio/p2.png"
              alt={t("physio.contact_subtitle")}
              className="h-full min-h-[280px] w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-900/35 to-transparent" />
            <p className="absolute bottom-5 left-5 text-sm font-semibold text-white">{t("physio.clinic_overlay")}</p>
          </div>
        </div>
      </section>

      <section id="treatments" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-emerald-900">{t("physio.treatments_title")}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(treatments) &&
              treatments.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5"
                >
                  <p className="font-medium text-emerald-800">{item}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-100 bg-emerald-50/60 p-8">
          <h2 className="text-3xl font-bold text-emerald-900">{t("physio.process_title")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Array.isArray(processSteps) &&
              processSteps.map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-2xl border border-emerald-100 bg-white p-5"
                >
                  <p className="text-sm font-medium text-slate-700">
                    {idx + 1}. {item}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <section id="exercises" className="scroll-mt-24 bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-emerald-900">{t("physio.exercises_title")}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(exercises) &&
              exercises.map((item) => (
                <div key={item} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-24 bg-emerald-900 px-4 py-16 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-md">
          <h2 className="text-3xl font-bold">{t("physio.why_title")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {whyItems.map((text) => (
              <p key={text} className="rounded-xl bg-white/10 p-4 text-sm">
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-emerald-900">{t("physio.benefits_title")}</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-4">
            {Array.isArray(benefits) &&
              benefits.map((item) => (
                <div key={item} className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 text-sm font-medium text-emerald-900">
                  {item}
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-emerald-900">{t("physio.testimonials_title")}</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {Array.isArray(testimonials) &&
              testimonials.map((quote, i) => (
                <motion.blockquote
                  key={quote}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-emerald-100 bg-white p-6 text-sm italic text-slate-600 shadow-sm"
                >
                  &ldquo;{quote}&rdquo;
                </motion.blockquote>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-emerald-900">{t("physio.gallery_title")}</h2>
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

      <section id="contact" className="scroll-mt-24 bg-white px-4 pb-20 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-600 p-8 text-white"
          >
            <h2 className="text-3xl font-bold">{t("physio.contact_title")}</h2>
            <p className="mt-3 text-sm text-white/90">{t("physio.contact_subtitle")}</p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <FaPhoneAlt /> {t("physio.contact_phone")}
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope /> {t("physio.contact_email")}
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt /> {t("physio.contact_address")}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+917708431557"
                className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:scale-105"
              >
                {t("common.call_now")}
              </a>
              <a
                href="https://wa.me/917708431557"
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
            <h3 className="text-xl font-semibold text-emerald-900">{t("physio.form_title")}</h3>
            <div className="mt-5 space-y-4">
              <input
                className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={t("common.placeholder_patient_name")}
              />
              <input
                className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={t("common.placeholder_phone")}
              />
              <textarea
                rows="4"
                className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={t("common.placeholder_condition")}
              />
              <button type="button" className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                {t("common.submit_request")}
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      <section className="bg-slate-50 px-4 pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
            <img src={getStaticImage("physio", "doctor")} alt={t("physio.doctor_name")} className="h-52 w-52 rounded-2xl object-cover" />
            <div>
              <h3 className="text-2xl font-bold text-emerald-800">{t("physio.doctor_name")}</h3>
              <p className="mt-1 text-sm font-medium text-emerald-700">{t("physio.doctor_creds")}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{t("physio.doctor_bio")}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Physio;
