"use client";

import { useState } from "react";
import {
  CalendarDays,
  Users,
  MapPin,
  Wallet,
} from "lucide-react";

export default function GetQuotePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    location: "",
    budget: "",
    services: [],
    message: "",
  });

  /* =====================
     HANDLE INPUT CHANGE
  ====================== */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =====================
     HANDLE SERVICES (CHECKBOX)
  ====================== */
  const handleServiceToggle = (service) => {
    setForm((prev) => {
      const exists = prev.services.includes(service);

      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  /* =====================
     SUBMIT FORM → BACKEND
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Quote submitted successfully!");

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        location: "",
        budget: "",
        services: [],
        message: "",
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f7f4f1] min-h-screen">

      {/* HERO */}
      <section className="py-24 text-center px-6">
        <p className="uppercase tracking-[6px] text-[#8b6c58] mb-4">
          Event Inquiry
        </p>

        <h1 className="text-5xl md:text-7xl font-serif text-[#231b1c] mb-6">
          Request A Quote
        </h1>

        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-8">
          Tell us about your event and we'll create a customized proposal
          tailored to your vision, requirements, and budget.
        </p>
      </section>

      {/* FORM */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-[1.5fr_450px] gap-12">

            {/* LEFT */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="text-3xl font-serif mb-10">
                Event Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">

                {/* NAME */}
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border p-3 md:p-4 text-sm md:text-base rounded-xl outline-none focus:ring-2 focus:ring-[#572649]"
                />

                {/* EMAIL */}
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border p-3 md:p-4 text-sm md:text-base rounded-xl outline-none focus:ring-2 focus:ring-[#572649]"
                />

                {/* PHONE */}
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                 className="w-full border p-3 md:p-4 text-sm md:text-base rounded-xl outline-none focus:ring-2 focus:ring-[#572649]"
                />

                {/* EVENT TYPE */}
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  className="w-full border p-3 md:p-4 text-sm md:text-base rounded-xl"
                >
                  <option value="">Event Type</option>
                  <option>Wedding</option>
                  <option>Corporate Event</option>
                  <option>Birthday Party</option>
                  <option>Luxury Event</option>
                </select>

                {/* DATE */}
                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  className="w-full border p-3 md:p-4 text-sm md:text-base rounded-xl outline-none focus:ring-2 focus:ring-[#572649]"
                />

                {/* LOCATION */}
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Event Location"
                  className="w-full border p-3 md:p-4 text-sm md:text-base rounded-xl outline-none focus:ring-2 focus:ring-[#572649]"
                />

                {/* BUDGET */}
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full border p-3 md:p-4 text-sm md:text-base rounded-xl"
                >
                  <option value="">Budget Range</option>
                  <option>₦500k - ₦1M</option>
                  <option>₦1M - ₦3M</option>
                  <option>₦3M - ₦5M</option>
                  <option>₦5M+</option>
                </select>

                {/* SERVICES */}
                <div>
                  <p className="font-medium mb-3">Services Needed</p>

                  {[
                    "Event Decoration",
                    "Full Planning",
                    "Photography",
                    "Catering",
                    "Venue Styling",
                  ].map((service) => (
                    <label className="flex items-center gap-2 text-sm md:text-base mb-2">
                      <input
                      className="w-4 h-4 accent-[#572649]"
                        type="checkbox"
                        checked={form.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                      />{" "}
                      {service}
                    </label>
                  ))}
                </div>

                {/* MESSAGE */}
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your vision..."
                  rows={6}
                 className="w-full border p-3 md:p-4 text-sm md:text-base rounded-xl"
                />

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#572649] text-white px-8 py-4 rounded-full"
                >
                  {loading ? "Sending..." : "Request Quote"}
                </button>
              </form>
            </div>

            {/* RIGHT INFO PANEL */}
            <div className="space-y-6">

              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <CalendarDays className="text-[#572649] mb-4" size={36} />

                <h3 className="text-2xl font-semibold mb-3">
                  Fast Response
                </h3>

                <p className="text-gray-600 leading-7">
                  We typically respond to quote requests within
                  24 hours.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <Users className="text-[#572649] mb-4" size={36} />

                <h3 className="text-2xl font-semibold mb-3">
                  Custom Planning
                </h3>

                <p className="text-gray-600 leading-7">
                  Every proposal is tailored specifically to your
                  event goals and guest experience.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <MapPin className="text-[#572649] mb-4" size={36} />

                <h3 className="text-2xl font-semibold mb-3">
                  Lagos & Beyond
                </h3>

                <p className="text-gray-600 leading-7">
                  We plan and manage events throughout Lagos
                  and destination locations across Nigeria.
                </p>
              </div>

              <div className="bg-[#572649] text-white rounded-3xl p-8">
                <Wallet size={36} className="mb-4" />

                <h3 className="text-2xl font-semibold mb-3">
                  Transparent Pricing
                </h3>

                <p className="text-white/80 leading-7">
                  Clear proposals with detailed breakdowns and
                  no hidden charges.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}