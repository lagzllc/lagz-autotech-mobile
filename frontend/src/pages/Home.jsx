import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <div className="text-center py-20 bg-blue-700 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold"
        >
          Lagz AutoTech Mobile
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xl"
        >
          Premier mobile mechanic services at your doorstep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            to="/booking"
            className="mt-6 inline-block bg-white text-blue-700 px-6 py-3 rounded font-bold shadow hover:scale-105 transition"
          >
            Book Service
          </Link>
        </motion.div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto p-10">
        {[
          "Full-Service Mobile Repairs",
          "Certified Technicians",
          "Fast Same-Day Booking",
        ].map((text, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded shadow p-6 text-center font-semibold"
          >
            {text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
