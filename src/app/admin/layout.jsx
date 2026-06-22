"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";



export default function AdminLayout({
  children,
}) {
 
 

  return (
    <AdminProtectedRoute>
      <div className="flex">

        <AdminSidebar />

        <div className="
        flex-1
        bg-gray-100
        min-h-screen
      ">

          <AdminNavbar />

          <main className="p-8">

            {children}

          </main>

        </div>

      </div>
    </AdminProtectedRoute>

  );
}