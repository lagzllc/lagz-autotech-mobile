// frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import AppAdmin from "./admin/AppAdmin.jsx";

// Public pages
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact.jsx";

// Public components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Tech pages
import TechLogin from "./pages/tech/Login.jsx";
import TechDashboard from "./pages/tech/Dashboard.jsx";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminBookings from "./pages/admin/AdminBookings.jsx";
import ServicesPage from "./pages/admin/ServicesPage.jsx";
import TechniciansPage from "./pages/admin/TechniciansPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public pages */}
        import { motion } from "framer-motion";
        import Navbar from "./components/Navbar";
        import Footer from "./components/Footer";

        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />

        {/* Technician pages */}
        <Route path="/tech/login" element={<TechLogin />} />
        <Route path="/tech/dashboard" element={<TechDashboard />} />

        {/* ADMIN PANEL — wrapped inside AppAdmin layout */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AppAdmin />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="technicians" element={<TechniciansPage />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
>
  <Navbar />

  <Routes>
    ...
  </Routes>

  <Footer />
</motion.div>
