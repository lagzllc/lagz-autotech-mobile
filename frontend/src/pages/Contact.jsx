import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div
      className="min-h-screen p-10 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Contact Us
      </motion.h1>

      <motion.div
        className="max-w-lg mx-auto bg-white p-6 rounded shadow"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="mb-4">Phone: (719) 510-6453</p>
        <p>Email: info@lagzautotechmobile.com</p>
      </motion.div>
    </motion.div>
  );
}
