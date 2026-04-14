import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-[999] 
      bg-white/70 backdrop-blur-2xl 
      border-b border-emerald-200 
      shadow-md

      /* 🔥 STRONG SEPARATOR LINE */
      after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px]
      after:bg-gradient-to-r after:from-transparent after:via-emerald-400/60 after:to-transparent

      /* 🔥 EXTRA GLOW EFFECT */
      before:absolute before:bottom-0 before:left-0 before:w-full before:h-[8px]
      before:bg-emerald-400/10 before:blur-xl before:opacity-70
      "
    >

      <div className="flex items-center justify-between h-18 px-4 sm:px-10">

        {/* LOGO */}
        <div className="flex items-center gap-3 group cursor-pointer">

          <img
            src="/logo.png" alt="logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain 
            transition-transform duration-300 group-hover:scale-110"
          />

          <span
            className="text-emerald-700 font-bold text-xl sm:text-2xl tracking-wide 
            transition duration-300 group-hover:text-emerald-600"
          >
            Veni Group
          </span>

        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">

          <button
            onClick={() => scrollToSection("companies")}
            className="relative hover:text-emerald-600 transition 
            after:block after:h-[2px] after:w-0 after:bg-emerald-500 
            after:transition-all after:duration-300 hover:after:w-full"
          >
            Companies
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="relative hover:text-emerald-600 transition 
            after:block after:h-[2px] after:w-0 after:bg-emerald-500 
            after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="relative hover:text-emerald-600 transition 
            after:block after:h-[2px] after:w-0 after:bg-emerald-500 
            after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </button>

          {/* 🔥 ENQUIRY BUTTON */}
          <button
            onClick={() => scrollToSection("contact")}
            className="ml-4 bg-emerald-500 hover:bg-emerald-600 
            text-white px-5 py-2 rounded-xl shadow-md 
            hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Enquiry
          </button>

        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-emerald-700 hover:scale-110 transition"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t border-emerald-100 px-4 py-4 flex flex-col gap-4 text-sm shadow-lg">

          <button
            onClick={() => scrollToSection("companies")}
            className="hover:text-emerald-600 transition"
          >
            Companies
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-emerald-600 transition"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-emerald-600 transition"
          >
            Contact
          </button>

          {/* MOBILE ENQUIRY BUTTON */}
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-emerald-500 text-white py-2 rounded-lg 
            hover:bg-emerald-600 transition shadow-md"
          >
            Enquiry
          </button>

        </div>
      )}

    </header>
  );
}

console.log("changed bro");

export default Navbar;
