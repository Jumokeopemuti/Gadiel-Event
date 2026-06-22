"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  MapPin,
  Save,
  Search,
  Trash2,
  Pencil,
  Users,
  UserCheck,
} from "lucide-react";

export default function StaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    address: "",
    bio: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


 const handleSubmit = async (e) => {
  e.preventDefault();

  let imageUrl = "";

  if (formData.image) {
    const imageData = new FormData();
    imageData.append("file", formData.image);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: imageData,
    });

    const uploadData = await uploadRes.json();
    imageUrl = uploadData.url;
  }

  const res = await fetch("/api/staff", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      image: imageUrl,
    }),
  });

  if (!res.ok) throw new Error("Failed");

  const savedStaff = await res.json();

  setStaffList((prev) => [savedStaff, ...prev]);
};




  const handleDelete = (id) => {
    setStaffList((prev) =>
      prev.filter((s) => s._id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Staff Management
            </h1>
            <p className="text-gray-500">
              Manage staff members and roles
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800"
          >
            {showForm ? "View Staff" : "+ Add Staff"}
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border">
            <Users />
            <p>Total Staff</p>
            <h2 className="text-2xl font-bold">{staffList.length}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl border">
            <Building2 />
            <p>Departments</p>
            <h2 className="text-2xl font-bold">
              {[...new Set(staffList.map((s) => s.department))].length}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl border">
            <UserCheck />
            <p>Roles</p>
            <h2 className="text-2xl font-bold">
              {[...new Set(staffList.map((s) => s.role))].length}
            </h2>
          </div>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="text-xl font-bold mb-6">
              Add New Staff
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <input
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <input
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border p-3 rounded-xl md:col-span-2"
              />

              <div>
                <label className="block mb-2 font-medium">
                  Staff Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
                  className="w-full border p-3 rounded-xl"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Bio
                </label>

                <textarea
                  name="bio"
                  placeholder="Short staff description..."
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  rows={4}
                />
              </div>

              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  className="w-24 h-24 rounded-full object-cover mt-3"
                />
              )}

              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-xl md:col-span-2"
              >
                <Save className="inline mr-2" />
                Save Staff
              </button>
            </form>
          </div>
        )}

        {/* TABLE */}
        {!showForm && (
          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="p-4 border-b flex items-center gap-3">
              <Search />
              <input
                placeholder="Search staff..."
                className="w-full outline-none"
              />
            </div>

            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {staffList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-10">
                      No staff found
                    </td>
                  </tr>
                ) : (
                  staffList.map((staff) => (
                    <tr key={staff._id} className="border-t">
                      <td className="p-4">
                        <img
                          src={staff.image || "/default.jpg"}
                          className="w-10 h-10 rounded-full object-cover"
                          alt={staff.fullName}
                        />
                      </td>
                      <td className="p-4">{staff.fullName}</td>
                      <td className="p-4">{staff.email}</td>
                      <td className="p-4">{staff.role}</td>
                      <td className="p-4">{staff.department}</td>

                      <td className="p-4 flex gap-2">
                        <button className="text-blue-600">
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(staff._id)}
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}