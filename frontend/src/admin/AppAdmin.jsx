// frontend/src/admin/AppAdmin.jsx

import AdminSidebar from "./components/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AppAdmin() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 w-full p-10 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
