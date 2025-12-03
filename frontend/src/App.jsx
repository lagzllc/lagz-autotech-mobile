import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminBookings from "./pages/admin/AdminBookings";

import TechLogin from "./pages/tech/TechLogin";
import TechDashboard from "./pages/tech/TechDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute role="admin">
              <AdminBookings />
            </ProtectedRoute>
          }
        />

        {/* Technician */}
        <Route path="/tech/login" element={<TechLogin />} />
        <Route
          path="/tech/dashboard"
          element={
            <ProtectedRoute role="tech">
              <TechDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
