"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function QuotesPage() {


  const [showModal, setShowModal] =
    useState(false);

  const [newQuote, setNewQuote] =
    useState({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      budget: "",
      eventDate: "",
      location: "",
      message: "",
    });

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);


  const createQuote = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "/api/quotes",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...newQuote,
            source: "admin",
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to create quote"
        );
      }

      const quote =
        await res.json();

      setQuotes((prev) => [
        quote,
        ...prev,
      ]);

      setShowModal(false);

      setNewQuote({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        budget: "",
        eventDate: "",
        location: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/quotes");

      const data = await res.json();

      console.log(
        "Quotes API Response:",
        data
      );

      setQuotes(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch Quotes Error:",
        error
      );

      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      const res = await fetch(
        `/api/quotes/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to update quote"
        );
      }

      setQuotes((prev) =>
        prev.map((quote) =>
          quote._id === id
            ? {
              ...quote,
              status,
            }
            : quote
        )
      );
    } catch (error) {
      console.error(
        "Update Status Error:",
        error
      );
    }
  };

  const safeQuotes = Array.isArray(
    quotes
  )
    ? quotes
    : [];

  const filteredQuotes = useMemo(() => {
    const value = search.toLowerCase();

    return safeQuotes.filter((quote) => {
      const matchesSearch =
        quote.name?.toLowerCase().includes(value) ||
        quote.eventType?.toLowerCase().includes(value);

      const matchesFilter =
        statusFilter === "All" ||
        quote.status === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [safeQuotes, search, statusFilter]);

  const totalRequests =
    safeQuotes.length;

  const pendingQuotes =
    safeQuotes.filter(
      (q) =>
        q.status === "Pending"
    ).length;

  const approvedQuotes =
    safeQuotes.filter(
      (q) =>
        q.status === "Approved"
    ).length;

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quote Requests
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and review
            client quote requests.
          </p>
        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="
    bg-black
    text-white
    px-5
    py-3
    rounded-xl
    font-medium
    hover:bg-gray-800
    transition
  "
        >
          + New Quote
        </button>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-gray-500 text-sm">
            Total Requests
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {totalRequests}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-gray-500 text-sm">
            Pending Quotes
          </p>

          <h3 className="text-3xl font-bold text-yellow-500 mt-2">
            {pendingQuotes}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-gray-500 text-sm">
            Approved Quotes
          </p>

          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {approvedQuotes}
          </h3>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {/* TOOLBAR */}

        <div className="p-5 border-b flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:w-[350px]">
            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search quotes..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                pl-11
                pr-4
                py-3
                rounded-xl
                border
                outline-none
                focus:ring-2
                focus:ring-black
              "
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="flex items-center gap-2 border px-4 py-3 rounded-xl hover:bg-gray-50"
            >
              <Filter size={18} />
              Filter
            </button>

            {showFilter && (
              <div className="absolute right-0 mt-2 bg-white border rounded-xl shadow-lg w-44 z-50">
                {["All", "Pending", "Approved", "Rejected"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setStatusFilter(item);
                      setShowFilter(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr className="text-sm text-gray-600">
                <th className="px-6 py-4 font-semibold">
                  Client Name
                </th>

                <th className="px-6 py-4 font-semibold">
                  Event
                </th>

                <th className="px-6 py-4 font-semibold">
                  Budget
                </th>

                <th className="px-6 py-4 font-semibold">
                  Date
                </th>

                <th className="px-6 py-4 font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="
                      px-6
                      py-10
                      text-center
                    "
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredQuotes.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="
                      px-6
                      py-10
                      text-center
                    "
                  >
                    No quote requests
                    found.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map(
                  (quote) => (
                    <tr
                      key={quote._id}
                      className="
                        border-t
                        hover:bg-gray-50
                      "
                    >
                      <td className="px-6 py-5 font-medium">
                        {quote.name ||
                          "-"}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {quote.eventType ||
                          "-"}
                      </td>

                      <td className="px-6 py-5 font-semibold">
                        {quote.budget ||
                          "-"}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {quote.eventDate
                          ? new Date(
                            quote.eventDate
                          ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${quote.status ===
                            "Approved"
                            ? "bg-green-100 text-green-700"
                            : quote.status ===
                              "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                            }`}
                        >
                          {quote.status ||
                            "Pending"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              updateStatus(
                                quote._id,
                                "Approved"
                              )
                            }
                            className="text-green-600 hover:text-green-800"
                          >
                            <CheckCircle
                              size={20}
                            />
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                quote._id,
                                "Rejected"
                              )
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircle
                              size={20}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">

            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">
                Create New Quote
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={createQuote}
              className="p-6 grid md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Client Name"
                required
                value={newQuote.name}
                onChange={(e) =>
                  setNewQuote({
                    ...newQuote,
                    name: e.target.value,
                  })
                }
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="email"
                placeholder="Email"
                value={newQuote.email}
                onChange={(e) =>
                  setNewQuote({
                    ...newQuote,
                    email: e.target.value,
                  })
                }
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Phone"
                value={newQuote.phone}
                onChange={(e) =>
                  setNewQuote({
                    ...newQuote,
                    phone: e.target.value,
                  })
                }
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Event Type"
                required
                value={newQuote.eventType}
                onChange={(e) =>
                  setNewQuote({
                    ...newQuote,
                    eventType:
                      e.target.value,
                  })
                }
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Budget"
                value={newQuote.budget}
                onChange={(e) =>
                  setNewQuote({
                    ...newQuote,
                    budget:
                      e.target.value,
                  })
                }
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="date"
                value={newQuote.eventDate}
                onChange={(e) =>
                  setNewQuote({
                    ...newQuote,
                    eventDate:
                      e.target.value,
                  })
                }
                className="border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Location"
                value={newQuote.location}
                onChange={(e) =>
                  setNewQuote({
                    ...newQuote,
                    location:
                      e.target.value,
                  })
                }
                className="border rounded-xl px-4 py-3 md:col-span-2"
              />

              <textarea
                rows={4}
                placeholder="Message"
                value={newQuote.message}
                onChange={(e) =>
                  setNewQuote({
                    ...newQuote,
                    message:
                      e.target.value,
                  })
                }
                className="border rounded-xl px-4 py-3 md:col-span-2"
              />

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="border px-5 py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-xl"
                >
                  Create Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}