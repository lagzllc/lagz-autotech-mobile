// frontend/src/pages/Services.jsx
import { motion } from "framer-motion";
import { getServices } from "../lib/api";
import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then((res) => setServices(res.services || res));
  }, []);

  return (
    <motion.div
      className="min-h-screen p-8 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-bold text-center mb-10">Our Services</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-white rounded-lg shadow hover:shadow-xl cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
            <p className="text-gray-600">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
