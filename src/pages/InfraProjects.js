import { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import {
  FaBuilding,
  FaRoad,
  FaPaintRoller,
  FaDraftingCompass,
  FaMapMarkedAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

function InfraProjects() {
  const [tab, setTab] = useState("completed");

  const completedImages = [
    "/projects/completed/c1.jpeg",
    "/projects/completed/c2.jpeg",
    "/projects/completed/c3.jpeg",
    "/projects/completed/c4.jpeg",
    "/projects/completed/c5.jpeg",
    "/projects/completed/c6.jpeg",
  ];

  const ongoingImages = [
    "/projects/ongoing/o1.jpg",
    "/projects/ongoing/o2.jpg",
    "/projects/ongoing/o3.jpg",
    "/projects/ongoing/o4.jpg",
    "/projects/ongoing/o5.jpg",
    "/projects/ongoing/o6.jpg",
  ];

  const currentImages = tab === "completed" ? completedImages : ongoingImages;

  return (
    <div className="bg-[#f8faf9] text-gray-800 overflow-x-hidden">
      <Navbar type="infra" />

      {/* ================= HERO ================= */}
      <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <video
          src="/infra.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover brightness-90 scale-105"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-4 animate-fadeUp">
          <p className="text-emerald-300 tracking-[0.3em] uppercase text-xs animate-pulse">
            VENI GROUP • CONSTRUCTION DIVISION
          </p>

          <h1 className="text-white text-3xl md:text-6xl font-bold mt-3 drop-shadow-2xl leading-tight">
            VENI Infra Projects Pvt Ltd
          </h1>

          <p className="text-white/85 mt-5 max-w-xl mx-auto text-sm md:text-lg px-2">
            Delivering high-quality construction, infrastructure, and consultancy
            services with precision and trust.
          </p>

          <a href="https://wa.me/919600557557">
            <button className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 rounded-xl shadow-xl hover:scale-110 transition-all duration-300">
              Get a Quote
            </button>
          </a>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="min-h-screen flex items-center px-4 sm:px-6 bg-white py-16 sm:py-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center w-full">

          {/* IMAGE */}
          <motion.img
            src="/about.jpg"
            alt="about"
            className="rounded-2xl shadow-2xl w-full h-[260px] sm:h-[340px] md:h-[420px] object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* CONTENT */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700">
              About VENI Infra Projects
            </h2>

            <p className="mt-5 text-gray-600 text-base sm:text-lg">
              We are a trusted civil engineering company delivering high-quality
              infrastructure solutions with strong focus on safety and timely
              execution.
            </p>

            {/* STATS */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-emerald-50 p-4 sm:p-6 rounded-2xl text-center shadow-md">
                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-700">120+</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Projects Completed</p>
              </div>

              <div className="bg-emerald-50 p-4 sm:p-6 rounded-2xl text-center shadow-md">
                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-700">95+</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Happy Clients</p>
              </div>

              <div className="bg-emerald-50 p-4 sm:p-6 rounded-2xl text-center shadow-md">
                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-700">7+</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Years Experience</p>
              </div>

              <div className="bg-emerald-50 p-4 sm:p-6 rounded-2xl text-center shadow-md">
                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-700">30+</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Engineers & Staff</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section
        id="services"
        className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white"
      >
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
            Our Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              { title: "Construction", desc: "Residential & commercial", icon: <FaBuilding /> },
              { title: "Infrastructure", desc: "Roads & highways", icon: <FaRoad /> },
              { title: "Interior Works", desc: "Modern finishing", icon: <FaPaintRoller /> },
              { title: "Consultancy", desc: "Planning & approvals", icon: <FaDraftingCompass /> },
              { title: "Land Survey", desc: "Accurate measurements", icon: <FaMapMarkedAlt /> },
              { title: "Valuation", desc: "Property valuation", icon: <FaMoneyBillWave /> },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 p-6 rounded-2xl border border-white/20 hover:-translate-y-2 transition"
              >
                <div className="text-4xl text-emerald-300 mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-white/80 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS SLIDER ================= */}
      <section
        id="projects"
        className="py-16 sm:py-20 bg-[#f8faf9] overflow-hidden scroll-mt-19.5"
      >
        <div className="w-full">
          <h2 className="text-3xl sm:text-5xl font-bold text-center text-emerald-700 mb-8 sm:mb-12 px-4">
            Our Projects
          </h2>

          {/* TOGGLE */}
          <div className="flex justify-center mb-10 sm:mb-14 gap-4 px-4">
            <button
              onClick={() => setTab("completed")}
              className={`px-5 sm:px-6 py-2 rounded-full border transition text-sm sm:text-base ${
                tab === "completed"
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white text-gray-700"
              }`}
            >
              Completed
            </button>

            <button
              onClick={() => setTab("ongoing")}
              className={`px-5 sm:px-6 py-2 rounded-full border transition text-sm sm:text-base ${
                tab === "ongoing"
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white text-gray-700"
              }`}
            >
              Ongoing
            </button>
          </div>

          {/* SCROLL WRAPPER */}
          <div className="overflow-hidden w-full">
            <div className="flex w-max gap-4 sm:gap-8 animate-scroll">
              {[...currentImages, ...currentImages].map((img, i) => (
                <div
                  key={i}
                  className="
                    relative flex-shrink-0
                    w-[260px] sm:w-[320px] md:w-[420px]
                    h-[300px] sm:h-[380px] md:h-[480px]
                    rounded-[2rem]
                    overflow-hidden
                    shadow-2xl group
                  "
                >
                  <img
                    src={img}
                    alt="project"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

                  <div className="absolute bottom-5 left-5 text-white">
                    <h3 className="text-sm font-bold opacity-0 group-hover:opacity-100 transition">
                      {tab === "completed" ? "Completed Project" : "Ongoing Project"}
                    </h3>
                    <p className="text-xs opacity-80">Civil Engineering</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

      {/* ================= WHY CHOOSE US ================= */}
      <section
        id="why"
        className="min-h-screen flex items-center px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-br from-emerald-900 to-emerald-700 text-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center w-full">

          {/* IMAGE */}
          <motion.img
            src="/why.jpg"
            alt="why us"
            className="rounded-2xl shadow-2xl w-full h-[260px] sm:h-[360px] md:h-[460px] object-cover"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          />

          {/* CONTENT */}
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10">
              Why Choose VENI Infra Projects
            </h2>

            <div className="space-y-5 sm:space-y-6">
              {[
                {
                  title: "Experienced Engineers",
                  desc: "Skilled team with years of civil engineering expertise.",
                },
                {
                  title: "Government & Private Projects",
                  desc: "Successfully handled multiple infrastructure contracts.",
                },
                {
                  title: "Quality Construction",
                  desc: "We use high-grade materials and strict quality control systems.",
                },
                {
                  title: "On-Time Delivery",
                  desc: "Project completion within committed deadlines.",
                },
                {
                  title: "Innovative Solutions",
                  desc: "Cost-effective and modern construction techniques.",
                },
              ].map((item, i) => (
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
                  <div className="w-2.5 h-2.5 mt-2 bg-emerald-300 rounded-full flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">{item.title}</h3>
                    <p className="text-white/80 text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="min-h-screen flex items-center px-4 sm:px-6 py-16 sm:py-20 bg-[#f8faf9]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 w-full">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-5 sm:mb-6">
              Contact Us
            </h2>

            <p className="text-gray-600 mb-8 sm:mb-10 text-sm sm:text-base">
              Get in touch with us for construction, consultancy, and
              infrastructure services. Our team will respond quickly.
            </p>

            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 flex-shrink-0">
                  <FaPhoneAlt />
                </div>
                <p className="text-gray-700 text-sm sm:text-base">+91 9600557557</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 flex-shrink-0">
                  <FaEnvelope />
                </div>
                <p className="text-gray-700 text-sm sm:text-base break-all">vipkmkoil@gmail.com</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                  Udaiyargudi, Kattumannarkoil, Tamil Nadu
                </p>
              </div>
            </div>

            {/* WHATSAPP CTA */}
            <a href="https://wa.me/919600557557">
              <button className="mt-8 sm:mt-10 bg-emerald-600 text-white px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition text-sm sm:text-base">
                Chat on WhatsApp
              </button>
            </a>
          </motion.div>

          {/* RIGHT SIDE (FORM) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl"
          >
            <form className="space-y-5 sm:space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-emerald-900 text-white py-6 text-center px-4">
        <p className="text-sm sm:text-base">© 2026 Veni Infra Projects Pvt Ltd | All Rights Reserved</p>
        <p className="text-xs sm:text-sm text-white/70 mt-1">Developed by DevnFix</p>
      </footer>
    </div>
  );
}

export default InfraProjects;