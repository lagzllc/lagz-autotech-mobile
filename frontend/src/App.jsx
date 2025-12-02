import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Public Pages
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact.jsx";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

// Technician Pages
import TechLogin from "./pages/tech/TechLogin.jsx";
import TechDashboard from "./pages/tech/Dashboard.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Technician */}
            <Route path="/tech" element={<TechLogin />} />
            <Route path="/tech/dashboard" element={<TechDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
