"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import {
  CalendarDays,
  Users,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function CheckAvailabilityPage() {
  const [date, setDate] = useState(null);
  const [available, setAvailable] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guests: "",
    service: "",
    message: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          eventDate: date, // from DatePicker
        }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Server did not return JSON:", text);
        return;
      }
      if (res.ok) {
        alert("Booking submitted successfully!");
        console.log(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkAvailability = async () => {
    if (!date) return;

    try {
      setAvailable(null); // optional loading state

      const res = await fetch("/api/bookings/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date.toISOString(),
        }),
      });

      const data = await res.json();

      setAvailable(data.available);
    } catch (error) {
      console.error("Availability check failed:", error);
      setAvailable(false);
    }
  };

  return (
    <main className="bg-[#f7f4f1] min-h-screen">

      {/* HERO */}
      <section className="py-24 text-center px-6">
        <p className="uppercase tracking-[6px] text-[#8b6c58] mb-4">
          Event Booking
        </p>

        <h1 className="text-5xl md:text-7xl font-serif text-[#231b1c] mb-6">
          Check Availability
        </h1>

        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          Select your preferred event date and we'll instantly
          let you know if we're available.
        </p>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-[450px_1fr] gap-12">

            {/* LEFT PANEL */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">

              <div className="flex items-center gap-3 mb-8">
                <CalendarDays className="text-[#572649]" />
                <h2 className="text-2xl font-semibold">
                  Select Date
                </h2>
              </div>

              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                inline
                minDate={new Date()}
              />

              <button
                onClick={checkAvailability}
                className="
                  w-full
                  mt-8
                  bg-[#572649]
                  hover:bg-[#6c315c]
                  text-white
                  py-4
                  rounded-full
                  transition
                "
              >
                Check Availability
              </button>

              {available === true && (
                <div className="
                  mt-6
                  bg-green-50
                  border
                  border-green-200
                  rounded-xl
                  p-5
                  flex
                  gap-3
                ">
                  <CheckCircle2
                    className="text-green-600"
                  />

                  <div>
                    <h4 className="font-semibold text-green-700">
                      Date Available
                    </h4>

                    <p className="text-sm text-green-600">
                      Great news! We are available.
                    </p>
                  </div>
                </div>
              )}

              {available === false && (
                <div className="
                  mt-6
                  bg-red-50
                  border
                  border-red-200
                  rounded-xl
                  p-5
                ">
                  <h4 className="font-semibold text-red-700">
                    Date Unavailable
                  </h4>

                  <p className="text-red-600 text-sm">
                    We already have an event booked
                    for this date.
                  </p>
                </div>
              )}
            </div>

            {/* BOOKING FORM */}
            <div className="bg-white rounded-3xl p-10 shadow-sm">

              <h2 className="text-3xl font-serif mb-10">
                Event Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* NAME + EMAIL */}
                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-200 p-4 rounded-xl"
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-gray-200 p-4 rounded-xl"
                  />
                </div>

                {/* PHONE + EVENT TYPE */}
                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="border border-gray-200 p-4 rounded-xl"
                  />

                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    className="border border-gray-200 p-4 rounded-xl"
                  >
                    <option value="">Select Event Type</option>
                    <option>Wedding</option>
                    <option>Corporate Event</option>
                    <option>Birthday</option>
                    <option>Memorial</option>
                    <option>Luxury Event</option>
                  </select>

                </div>

                {/* GUESTS + SERVICE */}
                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    name="guests"
                    type="number"
                    placeholder="Guest Count"
                    value={form.guests}
                    onChange={handleChange}
                    className="border border-gray-200 p-4 rounded-xl"
                  />

                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="border border-gray-200 p-4 rounded-xl"
                  >
                    <option value="">Select Service</option>
                    <option>Full Planning</option>
                    <option>Decoration</option>
                    <option>Coordination</option>
                    <option>Venue Styling</option>
                  </select>

                </div>

                {/* MESSAGE */}
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your event..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-4 rounded-xl"
                />

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="bg-[#572649] hover:bg-[#6c315c] text-white px-10 py-4 rounded-full transition"
                >
                  Request Booking
                </button>

              </form>
            </div>

          </div>

          {/* INFO CARDS */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white rounded-3xl p-8">
              <Clock3 className="text-[#572649] mb-4" />
              <h3 className="font-semibold text-xl mb-2">
                Quick Response
              </h3>
              <p className="text-gray-600">
                Availability confirmations within 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8">
              <CheckCircle2 className="text-[#572649] mb-4" />
              <h3 className="font-semibold text-xl mb-2">
                Secure Booking
              </h3>
              <p className="text-gray-600">
                Reserve your date with confidence.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8">
              <CalendarDays className="text-[#572649] mb-4" />
              <h3 className="font-semibold text-xl mb-2">
                Flexible Planning
              </h3>
              <p className="text-gray-600">
                We accommodate events of all sizes.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}