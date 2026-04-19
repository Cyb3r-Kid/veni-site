import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const COMPANY_ROUTE_MAP = {
  construction: "/infra-projects",
  trading: "/trading",
  investment: "/investment",
  physio: "/physio",
};

function CompanyCard({ company }) {
  const navigate = useNavigate();

  const targetPath = COMPANY_ROUTE_MAP[company.id] || `/${company.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      onClick={() => navigate(targetPath)}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-emerald-100/80 bg-white/75 shadow-lg shadow-emerald-950/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/15"
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={company.image}
          alt={company.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
          {company.subtitle}
        </span>
      </div>

      {/* CONTENT */}
      <div className="space-y-3 p-6">
        <h3 className="text-xl font-semibold text-emerald-900">
          {company.title}
        </h3>

        <p className="text-sm font-medium text-emerald-700">
          {company.subtitle}
        </p>

        <p className="text-sm leading-relaxed text-slate-600">
          {company.description}
        </p>

        <button
          type="button"
          className="mt-2 inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          {company.cta}
        </button>
      </div>
    </motion.article>
  );
}

export default CompanyCard;
