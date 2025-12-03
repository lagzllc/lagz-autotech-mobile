import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomersPage from "./pages/admin/CustomersPage";
import ServicesPage from "./pages/admin/ServicesPage";
import TechniciansPage from "./pages/admin/TechniciansPage";
import AdminBookings from "./pages/admin/AdminBookings";
import InvoicesPage from "./pages/admin/InvoicesPage";

// Technician pages
import TechLogin from "./pages/tech/TechLogin";
import TechDashboard from "./pages/tech/TechDashboard";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="flex-grow">
          <Routes>

            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin auth */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* Admin protected routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <ProtectedRoute role="admin">
                  <CustomersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute role="admin">
                  <ServicesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/technicians"
              element={
                <ProtectedRoute role="admin">
                  <TechniciansPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute role="admin">
                  <AdminBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/invoices"
              element={
                <ProtectedRoute role="admin">
                  <InvoicesPage />
                </ProtectedRoute>
              }
            />

            {/* Technician auth */}
            <Route path="/tech" element={<TechLogin />} />

            {/* Technician protected routes */}
            <Route
              path="/tech/dashboard"
              element={
                <ProtectedRoute role="tech">
                  <TechDashboard />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
