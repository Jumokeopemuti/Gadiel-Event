"use client";

import {
  Trash2,
  Mail,
  Search,
  MessageSquare,
  Users,
  Clock,
} from "lucide-react";

export default function MessagesTable({
  contacts = [],
  onDelete,
}) {

  if (contacts.length === 0) {
    return (
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Messages Inbox
          </h1>

          <p className="text-gray-500 mt-2">
            Manage incoming contact messages.
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-3xl border shadow-sm p-14">

          <div className="flex flex-col items-center text-center">

            <MessageSquare
              size={60}
              className="text-gray-300 mb-5"
            />

            <h2 className="text-xl font-semibold text-gray-900">
              No Messages Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Incoming contact messages will appear here.
            </p>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Messages Inbox
          </h1>

          <p className="text-gray-500 mt-2">
            Review and manage customer conversations.
          </p>
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Total Messages
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {contacts.length}
              </h3>
            </div>

            <Mail className="text-blue-500" />
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Senders
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {
                  [...new Set(
                    contacts.map((m) => m.email)
                  )].length
                }
              </h3>
            </div>

            <Users className="text-green-500" />
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-gray-500">
                Recent Activity
              </p>

              <h3 className="text-lg font-semibold mt-2">
                Live Inbox
              </h3>
            </div>

            <Clock className="text-purple-500" />
          </div>
        </div>

      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="border-b p-6">

          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search messages..."
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
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr className="text-left text-sm text-gray-600">

                <th className="px-6 py-4 font-semibold">
                  Sender
                </th>

                <th className="px-6 py-4 font-semibold">
                  Subject
                </th>

                <th className="px-6 py-4 font-semibold">
                  Message
                </th>

                <th className="px-6 py-4 font-semibold">
                  Date
                </th>

                <th className="px-6 py-4 font-semibold min-w-[180px]">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {contacts.map((message) => (

                <tr
                  key={message._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  {/* Sender */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="
                        w-12 h-12
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        flex
                        items-center
                        justify-center
                        font-bold
                      ">
                        {message.name?.charAt(0)}
                      </div>

                      <div>

                        <p className="font-semibold text-gray-900">
                          {message.name}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Mail size={14} />
                          {message.email}
                        </div>

                      </div>

                    </div>

                  </td>

                  {/* Subject */}
                  <td className="px-6 py-5 font-medium text-gray-700">
                    {message.subject}
                  </td>

                  {/* Message */}
                  <td className="px-6 py-5 max-w-md">

                    <p className="line-clamp-2 text-gray-600">
                      {message.message}
                    </p>

                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-gray-500 whitespace-nowrap">

                    {new Date(
                      message.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">

                    <button
                      onClick={() =>
                        onDelete(message._id)
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
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}