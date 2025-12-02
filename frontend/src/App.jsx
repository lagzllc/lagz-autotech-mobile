// frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Public pages
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact.jsx";

// Tech pages
import TechLogin from "./pages/tech/Login.jsx";
import TechDashboard from "./pages/tech/Dashboard.jsx";

// Admin pages (ONLY from src/pages/admin)
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
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />

        {/* Tech */}
        <Route path="/tech/login" element={<TechLogin />} />
        <Route path="/tech/dashboard" element={<TechDashboard />} />
      {/* ADMIN ROUTES */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/services" element={<ServicesPage />} />
      <Route path="/admin/technicians" element={<TechniciansPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
