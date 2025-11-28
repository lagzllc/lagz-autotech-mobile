import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BookingsPage from "./pages/BookingsPage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import ServicesPage from "./pages/ServicesPage";
import TechniciansPage from "./pages/TechniciansPage";

export default function AppAdmin() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<BookingsPage />} />
        <Route path="/admin/customers" element={<CustomersPage />} />
        <Route path="/admin/invoices" element={<InvoicesPage />} />
        <Route path="/admin/services" element={<ServicesPage />} />
        <Route path="/admin/technicians" element={<TechniciansPage />} />
      </Routes>
    </Router>
  );
}
