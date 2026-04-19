import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import SectionImageCard from "../components/SectionImageCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { getStaticImage, getStaticSectionImages } from "../data/imageRegistry";
import { subscribeSliderImages } from "../services/firebaseContent";

import {
  FaBuilding,
  FaRoad,
  FaPaintRoller,
  FaDraftingCompass,
  FaMapMarkedAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

function InfraProjects() {
  const { t } = useTranslation();
  const [tab, setTab] = useState("completed");
  const [sliderProjects, setSliderProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  const completedImages = getStaticSectionImages("construction", "projectSliderCompleted");
  const ongoingImages = getStaticSectionImages("construction", "projectSliderOngoing");

  const currentImages = tab === "completed" ? completedImages : ongoingImages;

  const certificates = useMemo(
    () => t("infra.certificates", { returnObjects: true }),
    [t]
  );

  const licenseItems = useMemo(
    () => [
      {
        title: "CMDA (SE Grade-I)",
        description: "Certified Structural Engineer registered with CMDA, holding M.E. in Structural Engineering with 5+ years of experience in safe and compliant structural design.",
        href: "/licenses/license1.pdf",
      },
      {
        title: "CMDA Registered Engineer (Grade-II)",
        description: "CMDA-registered Engineer (Grade-II) with M.E. in Structural Engineering and 6 years of experience in civil and structural design.",
        href: "/licenses/license2.pdf",
      },
      {
        title: "Contractor Registration Renewal (2023–2024)",
        description: "Approved renewal of contractor registration for Veni Infra Projects Pvt Ltd under Kattumannarkoil Municipality for executing government works in 2023–2024.",
        href: "/licenses/license3.pdf",
      },
    ],
    []
  );

  const whyItems = useMemo(
    () => t("infra.why_items", { returnObjects: true }),
    [t]
  );

  const gallery = useMemo(
  () => [
    "/client/infra/gallery1.jpeg",
    "/client/infra/gallery2.jpeg",
    "/client/infra/gallery3.jpeg",
  ],
  []
);


  const serviceItems = useMemo(
    () => [
      { id: "construction", icon: <FaBuilding /> },
      { id: "gov", icon: <FaRoad /> },
      { id: "infra", icon: <FaMapMarkedAlt /> },
      { id: "interior", icon: <FaPaintRoller /> },
      { id: "blocks", icon: <FaDraftingCompass /> },
      { id: "transport", icon: <FaMoneyBillWave /> },
    ],
    []
  );

  const projectHoverTitle =
    tab === "completed" ? t("infra.project_label_completed") : t("infra.project_label_ongoing");
  const sliderItems = useMemo(() => {
    const staticItems = currentImages.map((image, index) => ({
      key: `static-${tab}-${index}`,
      imageUrl: image,
      title: projectHoverTitle,
      caption: t("infra.project_caption"),
    }));
    const firestoreItems = sliderProjects
      .filter((project) => project.imageUrl && project.visible !== false)
      .map((project) => ({
        key: project.id,
        imageUrl: project.imageUrl,
        title: project.title || projectHoverTitle,
        caption: project.createdAtLabel || t("infra.project_caption"),
      }));

    const deduped = [...staticItems, ...firestoreItems].filter(
      (item, index, items) => items.findIndex((entry) => entry.imageUrl === item.imageUrl) === index
    );

    return deduped.length > 0 ? deduped : staticItems;
  }, [currentImages, projectHoverTitle, sliderProjects, t, tab]);

  useEffect(() => {
    setProjectsLoading(true);
    const unsubscribe = subscribeSliderImages(
      "construction",
      (items) => {
        setProjectsError("");
        setSliderProjects(items);
        setProjectsLoading(false);
      },
      (error) => {
        setProjectsError(error.message || "Failed to load project images.");
        setProjectsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#f8faf9] text-gray-800">
      <Navbar type="infra" />

      <section id="home" className="relative flex h-screen min-h-screen items-center justify-center overflow-hidden text-center scroll-mt-24">
        <video src="/infra.mp4" autoPlay loop muted playsInline className="absolute h-full w-full object-cover" />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-4 animate-fadeUp">
          <p className="animate-pulse text-xs uppercase tracking-[0.3em] text-emerald-300">{t("infra.hero_eyebrow")}</p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-white drop-shadow-2xl md:text-6xl">
            {t("infra.hero_title")}
          </h1>

          <p className="mx-auto mt-5 max-w-xl px-2 text-sm text-white/85 md:text-lg">{t("infra.hero_subtitle")}</p>

          <a href="https://wa.me/919600557557">
            <button
              type="button"
              className="mt-8 rounded-xl bg-emerald-500 px-7 py-3 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-emerald-600"
            >
              {t("common.get_quote")}
            </button>
          </a>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          <motion.img
            src={getStaticImage("construction", "about")}
            alt={t("infra.about_title")}
            className="h-[260px] w-full rounded-2xl object-cover shadow-2xl sm:h-[340px] md:h-[420px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />

          <div>
            <h2 className="text-3xl font-bold text-emerald-700 sm:text-4xl">{t("infra.about_title")}</h2>

            <p className="mt-5 text-base text-gray-600 sm:text-lg">{t("infra.about_p1")}</p>
            <p className="mt-3 text-sm text-slate-600">{t("infra.about_p2")}</p>
            <p className="mt-3 text-sm text-slate-600">{t("infra.about_p3")}</p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-2xl bg-emerald-50 p-4 text-center shadow-md sm:p-6">
                <h3 className="text-2xl font-bold text-emerald-700 sm:text-3xl">120+</h3>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">{t("infra.stat_projects")}</p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4 text-center shadow-md sm:p-6">
                <h3 className="text-2xl font-bold text-emerald-700 sm:text-3xl">95+</h3>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">{t("infra.stat_clients")}</p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4 text-center shadow-md sm:p-6">
                <h3 className="text-2xl font-bold text-emerald-700 sm:text-3xl">7+</h3>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">{t("infra.stat_years")}</p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4 text-center shadow-md sm:p-6">
                <h3 className="text-2xl font-bold text-emerald-700 sm:text-3xl">30+</h3>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">{t("infra.stat_staff")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <div className="grid items-center gap-8 md:grid-cols-[240px_1fr]">
            <img src="/client/photo.jpeg" alt={t("infra.owner_name")} className="h-68 w-56 rounded-2xl object-cover shadow-md" />
            <div>
              <h2 className="text-2xl font-bold text-emerald-800">{t("infra.owner_name")}</h2>
              <p className="mt-1 text-sm font-medium text-emerald-700">{t("infra.owner_role")}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{t("infra.owner_bio")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-emerald-800">{t("infra.gallery_title")}</h2>
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

      <section
        id="services"
        className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 px-4 py-16 text-white sm:px-6 sm:py-20"
      >
        <div className="w-full">
          <h2 className="mb-10 text-center text-3xl font-bold sm:mb-14 sm:text-4xl">{t("infra.services_title")}</h2>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
            {serviceItems.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/20 bg-white/10 p-6 transition hover:-translate-y-2">
                <div className="mb-3 text-4xl text-emerald-300">{item.icon}</div>
                <h3 className="text-lg font-semibold">{t(`infra.services.${item.id}_title`)}</h3>
                <p className="mt-2 text-sm text-white/80">{t(`infra.services.${item.id}_desc`)}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-white/90 backdrop-blur-md">
            {t("infra.services_note")}
          </div>
        </div>
      </section>

      <section id="certifications" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-emerald-800 md:text-4xl">{t("infra.cert_title")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">{t("infra.cert_subtitle")}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(certificates) &&
              certificates.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 shadow-sm"
                >
                  <p className="text-sm font-medium text-emerald-900">{item}</p>
                </motion.div>
              ))}
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {licenseItems.map((license, index) => (
              <motion.article
                key={license.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-emerald-100 bg-slate-50 p-6 shadow-sm"
              >
                <div className="flex h-full flex-col">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">License PDF</p>
                    <h3 className="mt-3 text-xl font-semibold text-emerald-900">{license.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{license.description}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={license.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      View PDF
                    </a>
                    <a
                      href={license.href}
                      download
                      className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 overflow-hidden bg-[#f8faf9] py-16 sm:py-20">
        <div className="w-full">
          <h2 className="mb-8 px-4 text-center text-3xl font-bold text-emerald-700 sm:mb-12 sm:text-5xl">
            {t("infra.projects_title")}
          </h2>

          <div className="mb-10 flex justify-center gap-4 px-4 sm:mb-14">
            <button
              type="button"
              onClick={() => setTab("completed")}
              className={`rounded-full border px-5 py-2 text-sm transition sm:px-6 sm:text-base ${
                tab === "completed" ? "border-emerald-500 bg-emerald-500 text-white" : "bg-white text-gray-700"
              }`}
            >
              {t("infra.tab_completed")}
            </button>

            <button
              type="button"
              onClick={() => setTab("ongoing")}
              className={`rounded-full border px-5 py-2 text-sm transition sm:px-6 sm:text-base ${
                tab === "ongoing" ? "border-emerald-500 bg-emerald-500 text-white" : "bg-white text-gray-700"
              }`}
            >
              {t("infra.tab_ongoing")}
            </button>
          </div>
          
          {projectsLoading ? (
            <div className="mx-auto mt-8 max-w-7xl rounded-3xl bg-white px-6 py-12 shadow-sm">
              <LoadingSpinner label="Loading project slider..." />
            </div>
          ) : projectsError ? (
            <div className="mx-auto mt-8 max-w-7xl rounded-3xl border border-red-100 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
              {projectsError}
            </div>
          ) : (
            <div className="mt-8 w-full overflow-hidden">
              <div className="flex w-max animate-scroll gap-4 sm:gap-8">
                {[...sliderItems, ...sliderItems].map((item, i) => (
                  <div
                    key={`${item.key}-${i}`}
                    className="group relative h-[300px] w-[260px] flex-shrink-0 overflow-hidden rounded-[2rem] shadow-2xl sm:h-[380px] sm:w-[320px] md:h-[480px] md:w-[420px]"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />

                    <div className="absolute bottom-5 left-5 text-white">
                      <h3 className="text-sm font-bold opacity-0 transition group-hover:opacity-100">{item.title}</h3>
                      <p className="text-xs opacity-80">{item.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              animation: scroll 22s linear infinite;
            }
          `}
        </style>
      </section>

      <section
        id="why"
        className="bg-gradient-to-br from-emerald-900 to-emerald-700 px-4 py-16 text-white sm:px-6 sm:py-20"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          <motion.img
            src={getStaticImage("construction", "owner")}
            alt={t("infra.why_title")}
            className="h-[260px] w-full rounded-2xl object-cover shadow-2xl sm:h-[360px] md:h-[460px]"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            <h2 className="mb-8 text-3xl font-bold sm:mb-10 sm:text-4xl">{t("infra.why_title")}</h2>

            <div className="space-y-5 sm:space-y-6">
              {Array.isArray(whyItems) &&
                whyItems.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-300" />
                    <div>
                      <h3 className="text-base font-semibold sm:text-lg">{item.title}</h3>
                      <p className="mt-1 text-sm text-white/80">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#f8faf9] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 sm:gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-5 text-3xl font-bold text-emerald-700 sm:mb-6 sm:text-4xl">{t("infra.contact_title")}</h2>

            <p className="mb-8 text-sm text-gray-600 sm:mb-10 sm:text-base">{t("infra.contact_intro")}</p>

            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 rounded-full bg-emerald-100 p-3 text-emerald-600">
                  <FaPhoneAlt />
                </div>
                <p className="text-sm text-gray-700 sm:text-base">{t("infra.contact_phone")}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 rounded-full bg-emerald-100 p-3 text-emerald-600">
                  <FaEnvelope />
                </div>
                <p className="break-all text-sm text-gray-700 sm:text-base">{t("infra.contact_email")}</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-full bg-emerald-100 p-3 text-emerald-600">
                  <FaMapMarkerAlt />
                </div>
                <p className="text-sm text-gray-700 sm:text-base">{t("infra.contact_address")}</p>
              </div>
            </div>

            <a href="https://wa.me/919600557557">
              <button
                type="button"
                className="mt-8 rounded-xl bg-emerald-600 px-6 py-3 text-sm text-white shadow-lg transition hover:scale-105 sm:mt-10 sm:px-8 sm:text-base"
              >
                {t("common.chat_whatsapp")}
              </button>
            </a>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="tel:+919600557557"
                className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {t("common.call_now")}
              </a>
              <a
                href="mailto:vipkmkoil@gmail.com"
                className="rounded-xl border border-emerald-300 bg-white px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                {t("common.get_consultation")}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white p-6 shadow-xl sm:p-8"
          >
            <form className="space-y-5 sm:space-y-6">
              <input
                type="text"
                placeholder={t("common.placeholder_name")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-base"
              />

              <input
                type="email"
                placeholder={t("common.placeholder_email")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-base"
              />

              <input
                type="tel"
                placeholder={t("common.placeholder_phone")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-base"
              />

              <textarea
                rows="4"
                placeholder={t("common.placeholder_message")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-base"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-600 py-3 text-sm text-white transition hover:bg-emerald-700 sm:text-base"
              >
                {t("common.send_message")}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default InfraProjects;
