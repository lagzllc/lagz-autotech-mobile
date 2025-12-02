// frontend/src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* HERO */}
      <section className="bg-primary text-white text-center py-32 shadow-lg">
        <motion.h1
          className="text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Premium Mobile Auto Repair
        </motion.h1>

        <motion.p
          className="text-xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Fast. Professional. At your home or office.
        </motion.p>

        <motion.div
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/booking"
            className="px-6 py-3 bg-white text-primary font-semibold rounded-full shadow hover:scale-110 transition"
          >
            Book an Appointment
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
}
