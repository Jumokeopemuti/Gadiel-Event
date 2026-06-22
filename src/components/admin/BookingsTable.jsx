"use client";

import { CheckCircle, Clock, Calendar } from "lucide-react";

export default function BookingsTable({
  bookings = [],
  onConfirm,
  onComplete,
  onTogglePaid,
}) {

  if (bookings.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border shadow-sm">
        <p className="text-center text-gray-500">
          No bookings available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">
          Event Bookings
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Booking ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-medium text-sm">
                  {booking.bookingId}
                </td>

                <td className="p-4 text-sm">
                  {booking.name}
                </td>

                <td className="p-4 text-sm">
                  {booking.service}
                </td>

                <td className="p-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(
                      booking.date
                    ).toLocaleDateString()}
                  </div>
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      onTogglePaid(
                        booking._id,
                        !booking.paid
                      )
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition
      ${booking.paid
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                  >
                    {booking.paid
                      ? "Paid"
                      : "Unpaid"}
                  </button>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm
                      ${booking.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {booking.status || "Pending"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        onConfirm(booking._id)
                      }
                      className="
                        flex items-center gap-2
                        bg-blue-600 hover:bg-blue-700
                        text-white
                        px-3 py-2
                        rounded-lg
                      "
                    >
                      <Clock size={16} />
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        onComplete(booking._id)
                      }
                      className="
                        flex items-center gap-2
                        bg-green-600 hover:bg-green-700
                        text-white
                        px-3 py-2
                        rounded-lg
                      "
                    >
                      <CheckCircle size={16} />
                      Complete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}