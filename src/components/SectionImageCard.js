import { motion } from "framer-motion";

function SectionImageCard({ src, alt, title, height = "h-64" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
    >
      <img src={src} alt={alt} className={`${height} w-full object-cover transition duration-700 group-hover:scale-110`} />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/75 via-emerald-900/20 to-transparent" />
      {title ? <p className="absolute bottom-4 left-4 text-sm font-semibold text-white">{title}</p> : null}
    </motion.div>
  );
}

export default SectionImageCard;
