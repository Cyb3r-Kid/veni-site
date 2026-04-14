import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const [index, setIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const slides = [
    {
      image: "/c1.jpg",
      title: "Strong Infrastructure Development",
      desc: "We deliver high-quality civil construction with trust and engineering excellence."
    },
    {
      image: "/f1.jpg",
      title: "Smart Investment Planning",
      desc: "We help you grow wealth with safe and strategic financial solutions."
    },
    {
      image: "/p1.jpg",
      title: "Advanced Physiotherapy Care",
      desc: "Professional rehabilitation and wellness treatments for recovery and strength."
    }
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  // ✅ SMOOTH CURSOR (IMPROVED)
  useEffect(() => {
    let raf;

    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setCursor({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-gray-800 bg-[#f8faf9] overflow-x-hidden">

      <Navbar />

      {/* ================= CURSOR (BETTER GLOW) ================= */}
      <div
        className="pointer-events-none fixed z-[9999] w-4 h-4 rounded-full bg-emerald-400/50 blur-sm transition-transform duration-75"
        style={{ transform: `translate(${cursor.x - 8}px, ${cursor.y - 8}px)` }}
      />

      <div
        className="pointer-events-none fixed z-[9998] w-10 h-10 rounded-full bg-emerald-300/20 blur-2xl transition-transform duration-150"
        style={{ transform: `translate(${cursor.x - 20}px, ${cursor.y - 20}px)` }}
      />

      {/* ================= HERO ================= */}
      <section className="relative h-screen overflow-hidden">

        <img
          src={slides[index].image} alt="c1"
          className="absolute w-full h-full object-cover scale-105 transition-all duration-1000"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-emerald-900/70"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">

          <p className="text-emerald-300 tracking-[0.3em] uppercase text-xs animate-pulse">
            Veni Group • Engineering Excellence
          </p>

          <h1 className="text-white text-3xl sm:text-6xl font-bold mt-3 animate-fadeUp drop-shadow-2xl">
            {slides[index].title}
          </h1>

          <p className="text-white/85 mt-5 max-w-xl text-sm sm:text-lg animate-fadeUp">
            {slides[index].desc}
          </p>

          <button
            onClick={() => scrollTo("companies")}
            className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            Our Companies
          </button>
        </div>
      </section>

      {/* ================= COMPANIES (RESPONSIVE FIX) ================= */}
      <section id="companies" className="py-20 md:py-28 px-4 md:px-10 bg-white">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14">
          Our Companies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto">

          {slides.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

              <img src={item.image} alt="f1" className="h-56 md:h-64 w-full object-cover hover:scale-110 transition duration-700" />

              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-emerald-700">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* ================= ABOUT (NEW PREMIUM CLEAN UI) ================= */}
      <section
        id="about"
        className="py-32 px-6 bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-800 text-white relative overflow-hidden"
      >

        <div className="absolute w-[500px] h-[500px] bg-emerald-500/20 blur-3xl rounded-full top-10 left-10"></div>
        <div className="absolute w-[400px] h-[400px] bg-green-300/10 blur-3xl rounded-full bottom-10 right-10"></div>

        <div className="relative text-center max-w-4xl mx-auto">

          <h2 className="text-4xl font-bold animate-fadeUp drop-shadow-xl">
            About Veni Group
          </h2>

          <p className="mt-4 text-white/70 text-sm sm:text-base max-w-2xl mx-auto animate-fadeUp">
            Multi-sector engineering group delivering infrastructure, finance & healthcare solutions with trust and innovation.
          </p>

        </div>

        {/* 3D CARDS FULL WIDTH */}
        <div className="grid md:grid-cols-3 gap-10 mt-16 max-w-7xl mx-auto">

          {[
            { icon: "🏗️", title: "Construction", desc: "High-quality infrastructure, roadways, and industrial projects." },
            { icon: "💰", title: "Finance", desc: "Smart investment planning and wealth management solutions." },
            { icon: "🏥", title: "Physiotherapy", desc: "Rehabilitation, recovery, and advanced physical therapy care." }
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10
              hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-lg"
            >
              <div className="text-5xl mb-4 animate-pulse">{item.icon}</div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-white/80 mt-3 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= CONTACT (CLICKABLE + REAL UI) ================= */}
      {/* ================= CONTACT (UPGRADED PREMIUM UI) ================= */}
<section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-white">

  {/* TITLE */}
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-5xl font-bold text-emerald-700 animate-fadeUp">
      Contact Us
    </h2>
    <p className="text-gray-500 mt-2 text-sm">
      Get in touch with our team for projects, services & consultation
    </p>
  </div>

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

    {/* INFO */}
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-500">
      <h2 className="text-xl md:text-2xl font-bold mb-3 text-emerald-700">
        Veni Groups
      </h2>

      <p className="text-sm text-gray-600 leading-relaxed hover:text-gray-800 transition">
        24, Duplicate Road, Opposite Aloysius School,<br />
        Virudhachalam - 579897
      </p>

      <div className="mt-4 text-sm space-y-2">

        <a href="tel:+9181110321333"
          className="block hover:text-emerald-600 transition hover:translate-x-1">
          📞 +91 811103 21333
        </a>

        <a href="tel:+9143274623221"
          className="block hover:text-emerald-600 transition hover:translate-x-1">
          📞 +91 432746 23221
        </a>

        <a href="mailto:araconstructiondpm@gmail.com"
          className="block hover:text-emerald-600 transition hover:translate-x-1">
          ✉️ Email Us
        </a>

      </div>
    </div>

    {/* LINKS */}
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-500">
      <h3 className="font-semibold mb-3 text-emerald-700">Useful Links</h3>

      <ul className="text-sm text-gray-600 space-y-2">
        {[
          "Infra Projects",
          "Private Limited Works",
          "Investment Planner",
          "Construction CCO",
          "Architecture"
        ].map((item, i) => (
          <li
            key={i}
            className="hover:text-emerald-600 cursor-pointer transition hover:translate-x-1"
          >
            → {item}
          </li>
        ))}
      </ul>
    </div>

    {/* SERVICES */}
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-500">
      <h3 className="font-semibold mb-3 text-emerald-700">Our Services</h3>

      <ul className="text-sm text-gray-600 space-y-2">
        {[
          "Building Plan Approval",
          "Estimation",
          "Interior Design",
          "3D Elevation",
          "Renovation"
        ].map((item, i) => (
          <li
            key={i}
            className="hover:text-emerald-600 cursor-pointer transition hover:translate-x-1"
          >
            → {item}
          </li>
        ))}
      </ul>
    </div>

    {/* SOCIAL */}
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-500">
      <h3 className="font-semibold mb-3 text-emerald-700">Follow Us</h3>

      <div className="flex gap-4 text-2xl">

        <a href="/"
          className="hover:scale-125 transition duration-300 hover:text-pink-500">
          📸
        </a>

        <a href="/"
          className="hover:scale-125 transition duration-300 hover:text-green-500">
          📱
        </a>

        <a href="/"
          className="hover:scale-125 transition duration-300 hover:text-blue-500">
          💬
        </a>

        <a href="/"
          className="hover:scale-125 transition duration-300 hover:text-emerald-600">
          🌐
        </a>

      </div>

      <p className="text-xs text-gray-500 mt-4">
        Instagram • WhatsApp • Website
      </p>
    </div>

  </div>
</section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-emerald-900 text-white py-6 text-center">
        <p>© 2026 Veni Group | All Rights Reserved</p>
        <p className="text-sm text-white/70">Developed by DevnFix</p>
      </footer>

    </div>
  );
}

export default Home;
