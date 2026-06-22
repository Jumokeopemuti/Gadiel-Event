"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Trash2, Mail } from "lucide-react";

export default function MessagesPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // FETCH MESSAGES
  useEffect(() => {
    fetchMessages();
  }, []);

 const fetchMessages = async () => {
  try {
    const res = await fetch("/api/contact");

    console.log("Status:", res.status);

    const text = await res.text();
    console.log("Response:", text);

    const data = text ? JSON.parse(text) : [];

    setContacts(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Fetch error:", error);
    setContacts([]);
  } finally {
    setLoading(false);
  }
};

  // DELETE MESSAGE
  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this message?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setContacts((prev) =>
        prev.filter((msg) => msg._id !== id)
      );

      alert("Message deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete message");
    }
  };

  // SAFE FILTER
  const safeContacts = Array.isArray(contacts) ? contacts : [];

  const filteredMessages = useMemo(() => {
    const value = search.toLowerCase();

    return safeContacts.filter((msg) => {
      return (
        msg.name?.toLowerCase().includes(value) ||
        msg.email?.toLowerCase().includes(value) ||
        msg.message?.toLowerCase().includes(value)
      );
    });
  }, [safeContacts, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Messages
            </h1>
            <p className="text-gray-500">
              View and manage contact form submissions
            </p>
          </div>

        </div>

        {/* SEARCH BAR */}
        <div className="bg-white p-4 rounded-xl border flex items-center gap-3">
          <Search className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full outline-none"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50 text-left">
              <tr className="text-sm text-gray-600">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Message</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan="4" className="p-10 text-center">
                    Loading messages...
                  </td>
                </tr>
              ) : filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-10 text-center">
                    <Mail className="mx-auto text-gray-300 mb-2" />
                    No messages found
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr key={msg._id} className="border-t hover:bg-gray-50">

                    <td className="p-4 font-medium">
                      {msg.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {msg.email}
                    </td>

                    <td className="p-4 text-gray-700 max-w-md truncate">
                      {msg.message}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        className="text-red-600 hover:text-red-800"
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

      </div>
    </div>
  );
}