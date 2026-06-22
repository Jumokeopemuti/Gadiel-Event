"use client";

import {
  Search,
  Trash2,
  Users,
  UserCheck,
  Building2,
  Pencil,
} from "lucide-react";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";




export default function StaffTable({ staffList, onDelete }) {

  const router = useRouter();



  const [search, setSearch] = useState("");

  const filteredStaff = staffList.filter((staff) =>
    staff.fullName
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    staff.email
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const editStaff = (staff) => {
    router.push(`/admin/staff/edit/${staff._id}`);
  };


  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Staff Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your organization staff members.
          </p>
        </div>


        <Link href="/admin/staff/add">
          <button

            className="bg-black text-white px-5 py-3 rounded-xl font-medium hover:bg-gray-800 transition">
            + Add Staff
          </button>

        </Link>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Total Staff
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {staffList.length}
              </h3>
            </div>

            <Users className="text-blue-500" />
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Departments
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {
                  [...new Set(
                    filteredStaff.map(
                      (staff) => staff.department
                    )
                  )].length
                }
              </h3>
            </div>

            <Building2 className="text-green-500" />
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Active Roles
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {
                  [...new Set(
                    staffList.map(
                      (staff) => staff.role
                    )
                  )].length
                }
              </h3>
            </div>

            <UserCheck className="text-purple-500" />
          </div>
        </div>

      </div>

      {/* Table Card */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="p-5 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="relative w-full md:w-[350px]">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search staff..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
            />


          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-600">

                <th className="px-6 py-4 font-semibold">
                  Staff
                </th>

                <th className="px-6 py-4 font-semibold">
                  Contact
                </th>

                <th className="px-6 py-4 font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 font-semibold">
                  Department
                </th>

                <th className="px-6 py-4 font-semibold">
                  Address
                </th>

                <th className="px-6 py-4 font-semibold min-w-[220px]">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {staffList.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-14 text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Users
                        size={45}
                        className="text-gray-300"
                      />

                      <p className="font-medium">
                        No staff found
                      </p>

                      <span className="text-sm text-gray-400">
                        Add staff members to get started.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                staffList.map((staff) => (
                  <tr
                    key={staff._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    {/* Staff Info */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                          {staff.fullName?.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {staff.fullName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {staff.email}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5 text-gray-600">
                      {staff.phone}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-5">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {staff.role}
                      </span>

                    </td>

                    {/* Department */}
                    <td className="px-6 py-5 text-gray-700">
                      {staff.department}
                    </td>

                    {/* Address */}
                    <td className="px-6 py-5 text-gray-600 max-w-xs truncate">
                      {staff.address}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5">

                      <div className="flex flex-nowrap items-center gap-2">

                        <button
                          onClick={() => editStaff(staff)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                        >
                          <Pencil size={16} />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => onDelete(staff._id)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>

                      </div>

                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}