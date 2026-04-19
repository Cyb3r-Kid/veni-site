import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaTruckMoving,
  FaCubes,
  FaTools,
  FaIndustry,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionImageCard from "../components/SectionImageCard";
import { useTranslation } from "react-i18next";
import { getStaticImage, getStaticSectionImages } from "../data/imageRegistry";
import { createOrder } from "../services/firebaseContent";

const productKeys = ["ramco", "dalmia", "bharathi", "aac", "solid", "paver"];
const productOptions = ["Cement", "Steel", "Sand", "Bricks"];
const brandOptions = ["Ramco", "Dalmia", "UltraTech"];
const unitOptions = ["Bags", "Tons"];

const initialForm = {
  customerName: "",
  phoneNumber: "",
  productType: "Cement",
  brand: "Ramco",
  quantity: "",
  unit: "Bags",
  deliveryAddress: "",
};

function Trading() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({ saving: false, success: "", error: "" });

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  const supplyFocus = useMemo(
    () => [
      t("trading.supply_focus_0"),
      t("trading.supply_focus_1"),
      t("trading.supply_focus_2"),
      t("trading.supply_focus_3"),
    ],
    [t]
  );

  const transportItems = useMemo(
    () => [
      t("trading.transport_sand_m"),
      t("trading.transport_sand_p"),
      t("trading.transport_blue"),
      t("trading.transport_gravel"),
    ],
    [t]
  );

  const equipmentItems = useMemo(
    () => [
      { title: t("trading.equipment_jcb"), icon: <FaIndustry /> },
      { title: t("trading.equipment_tractor"), icon: <FaCubes /> },
      { title: t("trading.equipment_tipper"), icon: <FaTools /> },
    ],
    [t]
  );

  const whyItems = useMemo(
    () => [t("trading.why_0"), t("trading.why_1"), t("trading.why_2"), t("trading.why_3")],
    [t]
  );

  const gallery = useMemo(
  () => [
    "/client/trading/gallery1.jpg",
    "/client/trading/gallery2.jpg",
    "/client/trading/gallery3.jpg",
  ],
  []
);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.customerName.trim()) nextErrors.customerName = "Customer name is required.";
    if (!/^\d{10}$/.test(form.phoneNumber.replace(/\D/g, ""))) nextErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    if (!form.quantity || Number(form.quantity) <= 0) nextErrors.quantity = "Quantity must be greater than zero.";
    if (!form.deliveryAddress.trim()) nextErrors.deliveryAddress = "Delivery address is required.";

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm();

    setErrors(nextErrors);
    setSubmitState({ saving: false, success: "", error: "" });

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSubmitState({ saving: true, success: "", error: "" });
      await createOrder({
        customerName: form.customerName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        productType: form.productType,
        brand: form.brand,
        quantity: Number(form.quantity),
        unit: form.unit,
        deliveryAddress: form.deliveryAddress.trim(),
      });

      setForm(initialForm);
      setSubmitState({ saving: false, success: "Order request submitted successfully.", error: "" });
    } catch (error) {
      setSubmitState({
        saving: false,
        success: "",
        error: error.message || "Unable to submit the order request right now.",
      });
    }
  };

  return (
    <div className="overflow-x-hidden bg-slate-50 text-slate-800">
      <Navbar type="trading" />

      <section id="home" className="relative flex h-screen min-h-screen items-center overflow-hidden scroll-mt-24">
        <img src="/trading.jpg" alt={t("trading.hero_title")} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/62 via-black/38 to-emerald-900/62" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">{t("trading.hero_eyebrow")}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-6xl">{t("trading.hero_title")}</h1>
          <p className="mt-5 max-w-2xl text-sm text-white/85 md:text-base">{t("trading.hero_subtitle")}</p>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm"
          >
            <h2 className="text-3xl font-bold text-emerald-800">{t("trading.about_title")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{t("trading.about_body")}</p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-8"
          >
            <h3 className="text-xl font-semibold text-emerald-900">{t("trading.supply_focus_title")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {supplyFocus.map((line) => (
                <li key={line}>- {line}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="products" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-emerald-900">{t("trading.products_title")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-lg font-semibold text-emerald-800">{t(`trading.products.${key}.name`)}</h3>
                <p className="mt-2 text-sm text-slate-600">{t(`trading.products.${key}.tag`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-emerald-900">{t("trading.gallery_title")}</h2>
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

      <section id="transport" className="scroll-mt-24 bg-emerald-900 px-4 py-16 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <FaTruckMoving className="text-2xl text-emerald-300" />
            <h2 className="text-3xl font-bold">{t("trading.transport_title")}</h2>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-white/85">{t("trading.transport_body")}</p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {transportItems.map((item) => (
              <div key={item} className="rounded-xl bg-white/10 p-3 text-sm text-white/90">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="equipment" className="scroll-mt-24 bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-emerald-900">{t("trading.equipment_title")}</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {equipmentItems.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-xl text-emerald-700">{item.icon}</div>
                <p className="mt-3 font-medium">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-emerald-50 p-8">
          <h2 className="text-3xl font-bold text-emerald-900">{t("trading.why_title")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {whyItems.map((text) => (
              <p key={text} className="rounded-xl bg-white p-4 text-sm text-slate-700">
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-white px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-600 p-8 text-white"
          >
            <h2 className="text-3xl font-bold">{t("trading.contact_title")}</h2>
            <p className="mt-3 text-sm text-white/90">{t("trading.contact_intro")}</p>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <FaPhoneAlt /> {t("trading.contact_phone")}
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope /> {t("trading.contact_email")}
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt /> {t("trading.contact_address")}
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
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-xl font-semibold text-emerald-900">Place a Trading Order</h3>
            <p className="mt-2 text-sm text-slate-600">Save customer material requests to the `orders` collection.</p>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <input
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Customer Name"
                />
                {errors.customerName ? <p className="mt-1 text-xs text-red-600">{errors.customerName}</p> : null}
              </div>

              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Phone Number"
                />
                {errors.phoneNumber ? <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p> : null}
              </div>

              <select
                name="productType"
                value={form.productType}
                onChange={handleChange}
                className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {productOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {brandOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div>
                <input
                  type="number"
                  min="1"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Quantity"
                />
                {errors.quantity ? <p className="mt-1 text-xs text-red-600">{errors.quantity}</p> : null}
              </div>

              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {unitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div className="md:col-span-2">
                <textarea
                  rows="4"
                  name="deliveryAddress"
                  value={form.deliveryAddress}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Delivery Address"
                />
                {errors.deliveryAddress ? <p className="mt-1 text-xs text-red-600">{errors.deliveryAddress}</p> : null}
              </div>

              {submitState.error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 md:col-span-2">{submitState.error}</p> : null}
              {submitState.success ? <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 md:col-span-2">{submitState.success}</p> : null}

              <button
                type="submit"
                disabled={submitState.saving}
                className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
              >
                {submitState.saving ? "Submitting..." : "Submit Order Request"}
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      <section className="bg-slate-50 px-4 pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
            <img src="/part.jpg" alt={t("trading.partner_title")} className="h-52 w-52 rounded-2xl object-cover" />
            <div>
              <h3 className="text-2xl font-bold text-emerald-800">{t("trading.partner_title")}</h3>
              <p className="mt-1 text-sm font-medium text-emerald-700">{t("trading.partner_role")}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{t("trading.partner_body")}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Trading;
