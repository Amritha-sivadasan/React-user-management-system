import React from "react";
import AdminHeader from "../../components/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminHeader />
      {children}
    </div>
  );
}
