"use client";

import { useEffect, useState } from "react";

import BookingsTable from "@/components/admin/BookingsTable";

export default function BookingsPage() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings =
    async () => {
      try {
        const res =
          await fetch(
            "/api/bookings"
          );

        const data =
          await res.json();

        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const updateStatus =
    async (id, status) => {
      try {
        const res =
          await fetch(
            `/api/bookings/${id}`,
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

        if (!res.ok)
          throw new Error();

        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id
              ? {
                ...booking,
                status,
              }
              : booking
          )
        );
      } catch (error) {
        console.error(error);
      }
    };
  const updatePaymentStatus = async (
    id,
    newPaidStatus
  ) => {
    try {
      const res = await fetch(
        `/api/bookings/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            paid: newPaidStatus,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
          "Failed to update payment"
        );
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? {
              ...booking,
              paid: newPaidStatus,
            }
            : booking
        )
      );
    } catch (error) {
      console.error(
        "Payment Update Error:",
        error
      );
    }
  };


  if (loading) {
    return (
      <div>
        Loading bookings...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Bookings
      </h1>

      <BookingsTable
        bookings={bookings}
        onConfirm={(id) =>
          updateStatus(
            id,
            "Confirmed"
          )
        }
        onComplete={(id) =>
          updateStatus(
            id,
            "Completed"
          )
        }
        onTogglePaid={
          updatePaymentStatus
        }
      />
    </div>
  );
}