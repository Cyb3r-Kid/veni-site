import { motion } from "framer-motion";
import Navbar from "./Navbar";

function DivisionPage({
  type = "home",
  title,
  subtitle,
  heroImage,
  highlights = [],
  services = [],
  ctaLabel = "Contact Team",
  ctaLink = "#contact",
}) {
  return (
    <div className="overflow-x-hidden bg-slate-50 text-slate-800">
      <Navbar type={type} />

      <section className="relative flex min-h-[78vh] items-center overflow-hidden">
        <img src={heroImage} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-emerald-900/70" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.28em] text-emerald-300"
          >
            VIP Group Division
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-2xl text-base text-white/85 md:text-lg"
          >
            {subtitle}
          </motion.p>
          <a
            href={ctaLink}
            className="mt-9 inline-block rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            {ctaLabel}
          </a>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3">
          {highlights.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-emerald-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-emerald-950/95 px-4 py-16 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Core Services</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <div key={service} className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-sm">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DivisionPage;
