"use client";

import { useState, useEffect } from "react";

import {
  Users,
  Search,
  Trash2,
  Calendar,
  Mail,
  UserPlus,
  X,
} from "lucide-react";

export default function ClientsPage() {

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      source: "Manual",
      eventType: "",
    });

  /* Filter Clients */

  const filteredClients =
    clients.filter((client) =>
      client.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /* Input Change */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  /* Add Client */

  const handleAddClient = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setClients((prev) => [data, ...prev]);

        setFormData({
          name: "",
          email: "",
          phone: "",
          source: "Manual",
          eventType: "",
        });

        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };




  /* Delete */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this client?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/client/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setClients((prev) =>
          prev.filter((client) => client._id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };



  /* Badge Colors */

  const getBadgeColor = (
    source
  ) => {

    switch (source) {

      case "Booking":
        return `
          bg-green-100
          text-green-700
        `;

      case "Quote":
        return `
          bg-blue-100
          text-blue-700
        `;

      case "Message":
        return `
          bg-purple-100
          text-purple-700
        `;

      default:
        return `
          bg-gray-100
          text-gray-700
        `;
    }
  };



  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/client");

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error:", errorText);
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setClients(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-5
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            text-gray-900
          ">
            Clients Management
          </h1>

          <p className="
            text-gray-500
            mt-2
          ">
            Manage and track company clients.
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="
            inline-flex
            items-center
            gap-2
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-gray-800
            transition
          "
        >

          <UserPlus size={18} />

          Add Client

        </button>

      </div>

      {/* Stats */}

      <div className="
        grid
        md:grid-cols-4
        gap-5
      ">

        {/* Total */}

        <div className="
          bg-white
          rounded-2xl
          border
          shadow-sm
          p-5
        ">

          <div className="
            flex
            justify-between
          ">

            <div>

              <p className="
                text-sm
                text-gray-500
              ">
                Total Clients
              </p>

              <h2 className="
                text-4xl
                font-bold
                mt-3
              ">
                {clients.length}
              </h2>

            </div>

            <Users className="
              text-blue-500
            " />

          </div>

        </div>

        {/* Booking */}

        <div className="
          bg-white
          rounded-2xl
          border
          shadow-sm
          p-5
        ">

          <div className="
            flex
            justify-between
          ">

            <div>

              <p className="
                text-sm
                text-gray-500
              ">
                Booking Clients
              </p>

              <h2 className="
                text-4xl
                font-bold
                mt-3
              ">
                {
                  clients.filter(
                    c =>
                      c.source ===
                      "Booking"
                  ).length
                }
              </h2>

            </div>

            <Calendar className="
              text-green-500
            " />

          </div>

        </div>

        {/* Quote */}

        <div className="
          bg-white
          rounded-2xl
          border
          shadow-sm
          p-5
        ">

          <div className="
            flex
            justify-between
          ">

            <div>

              <p className="
                text-sm
                text-gray-500
              ">
                Quote Clients
              </p>

              <h2 className="
                text-4xl
                font-bold
                mt-3
              ">
                {
                  clients.filter(
                    c =>
                      c.source ===
                      "Quote"
                  ).length
                }
              </h2>

            </div>

            <Mail className="
              text-purple-500
            " />

          </div>

        </div>

        {/* Manual */}

        <div className="
          bg-white
          rounded-2xl
          border
          shadow-sm
          p-5
        ">

          <div className="
            flex
            justify-between
          ">

            <div>

              <p className="
                text-sm
                text-gray-500
              ">
                Manual Clients
              </p>

              <h2 className="
                text-4xl
                font-bold
                mt-3
              ">
                {
                  clients.filter(
                    c =>
                      c.source ===
                      "Manual"
                  ).length
                }
              </h2>

            </div>

            <UserPlus className="
              text-orange-500
            " />

          </div>

        </div>

      </div>

      {/* Table Card */}

      <div className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        overflow-hidden
      ">

        {/* Toolbar */}

        <div className="
          p-6
          border-b
        ">

          <div className="
            relative
            max-w-md
          ">

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
              placeholder="Search clients..."
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

        </div>

        {/* Table */}

        <div className="
          overflow-x-auto
        ">

          <table className="
            w-full
          ">

            <thead className="
              bg-gray-50
            ">

              <tr className="
                text-left
                text-sm
                text-gray-600
              ">

                <th className="
                  px-6 py-4
                ">
                  Client
                </th>

                <th className="
                  px-6 py-4
                ">
                  Phone
                </th>

                <th className="
                  px-6 py-4
                ">
                  Event
                </th>

                <th className="
                  px-6 py-4
                ">
                  Source
                </th>

                <th className="
                  px-6 py-4
                ">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredClients.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="
                      py-16
                      text-center
                      text-gray-500
                    "
                  >

                    No clients found

                  </td>

                </tr>

              ) : (

                filteredClients.map(
                  (client) => (

                    <tr
                      key={client._id}
                      className="
                        border-t
                        hover:bg-gray-50
                        transition
                      "
                    >

                      {/* Client */}

                      <td className="
                        px-6 py-5
                      ">

                        <div className="
                          flex
                          items-center
                          gap-4
                        ">

                          <div className="
                            w-12
                            h-12
                            rounded-full
                            bg-indigo-100
                            text-indigo-700
                            flex
                            items-center
                            justify-center
                            font-bold
                          ">

                            {
                              client.name
                                ?.charAt(0)
                            }

                          </div>

                          <div>

                            <h4 className="
                              font-semibold
                            ">
                              {client.name}
                            </h4>

                            <p className="
                              text-sm
                              text-gray-500
                            ">
                              {client.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Phone */}

                      <td className="
                        px-6 py-5
                        text-gray-600
                      ">
                        {client.phone}
                      </td>

                      {/* Event */}

                      <td className="
                        px-6 py-5
                      ">
                        {client.eventType}
                      </td>

                      {/* Source */}

                      <td className="
                        px-6 py-5
                      ">

                        <span className={`
                          inline-block
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-medium
                          ${getBadgeColor(
                          client.source
                        )}
                        `}>

                          {client.source}

                        </span>

                      </td>

                      {/* Actions */}

                      <td className="
                        px-6 py-5
                      ">

                        <button
                          onClick={() =>
                            handleDelete(client._id)
                          }
                          className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-xl
                            bg-red-50
                            text-red-600
                            hover:bg-red-100
                            transition
                          "
                        >

                          <Trash2
                            size={16}
                          />

                          Delete

                        </button>

                      </td>

                    </tr>
                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Modal */}

      {showModal && (

        <div className="
          fixed
          inset-0
          bg-black/40
          z-50
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            bg-white
            rounded-3xl
            w-full
            max-w-2xl
            shadow-2xl
            overflow-hidden
          ">

            {/* Header */}

            <div className="
              flex
              items-center
              justify-between
              p-6
              border-b
            ">

              <div>

                <h2 className="
                  text-2xl
                  font-bold
                ">
                  Add New Client
                </h2>

                <p className="
                  text-gray-500
                  mt-1
                ">
                  Create a new client record.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                  p-2
                  rounded-lg
                  hover:bg-gray-100
                "
              >

                <X size={20} />

              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={
                handleAddClient
              }
              className="
                p-6
                grid
                md:grid-cols-2
                gap-5
              "
            >

              {/* Name */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  mb-2
                ">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="John Doe"
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

              </div>

              {/* Email */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  mb-2
                ">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="john@email.com"
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

              </div>

              {/* Phone */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  mb-2
                ">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="08012345678"
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

              </div>

              {/* Event */}

              <div>

                <label className="
                  block
                  text-sm
                  font-medium
                  mb-2
                ">
                  Event Type
                </label>

                <input
                  type="text"
                  name="eventType"
                  value={
                    formData.eventType
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Wedding"
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

              </div>

              {/* Source */}

              <div className="
                md:col-span-2
              ">

                <label className="
                  block
                  text-sm
                  font-medium
                  mb-2
                ">
                  Source
                </label>

                <select
                  name="source"
                  value={
                    formData.source
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                >

                  <option value="Manual">
                    Manual
                  </option>

                  <option value="Booking">
                    Booking
                  </option>

                  <option value="Quote">
                    Quote
                  </option>

                  <option value="Message">
                    Message
                  </option>

                </select>

              </div>

              {/* Footer */}

              <div className="
                md:col-span-2
                flex
                justify-end
                gap-3
                pt-2
              ">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="
                    px-5
                    py-3
                    rounded-xl
                    border
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    px-5
                    py-3
                    rounded-xl
                    bg-black
                    text-white
                    hover:bg-gray-800
                  "
                >
                  Save Client
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}