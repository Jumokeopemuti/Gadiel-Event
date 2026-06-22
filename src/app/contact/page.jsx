"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      alert("Inquiry sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send inquiry");
    }
  };


  return (
    <main className="bg-[#f7f4f1]">

      {/* HERO */}
      <section className="py-32 text-center">
        <p className="uppercase tracking-[6px] text-[#8b6c58] mb-4">
          Get In Touch
        </p>

        <h1 className="text-5xl md:text-7xl font-serif text-[#231b1c]">
          Let's Plan Something Extraordinary
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-gray-600 text-lg">
          Whether you're planning a wedding, corporate event, birthday
          celebration, or private gathering, we'd love to hear from you.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* CONTACT FORM */}
          <div className="bg-white p-10 rounded-3xl shadow-sm">
            <h2 className="text-3xl font-serif mb-8">
              Send Us A Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-[#572649]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-[#572649]"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-[#572649]"
              />
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full border border-gray-200 p-4 rounded-xl outline-none"
              >
                <option value="">Select Event Type</option>
                <option>Wedding</option>
                <option>Corporate Event</option>
                <option>Birthday Celebration</option>
                <option>Memorial Gathering</option>
                <option>Luxury Event</option>
              </select>

              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your event..."
                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-[#572649]"
              />

              <button
                type="submit"
                className="
    bg-[#572649]
    hover:bg-[#6c315c]
    text-white
    px-8
    py-4
    rounded-full
    transition
  "
              >
                Send Inquiry
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-8">

            <div className="bg-white p-8 rounded-3xl shadow-sm flex gap-5">
              <Phone className="text-[#572649]" />
              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Call Us
                </h3>
                <p className="text-gray-600">
                  +2348034352800
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm flex gap-5">
              <Mail className="text-[#572649]" />
              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Email Address
                </h3>
                <p className="text-gray-600">
                  gadielluxury@gmail.com
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm flex gap-5">
              <MapPin className="text-[#572649]" />
              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Office Location
                </h3>
                <p className="text-gray-600">
                  Lekki, Lagos, Nigeria
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm flex gap-5">
              <Clock className="text-[#572649]" />
              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Working Hours
                </h3>
                <p className="text-gray-600">
                  Monday to Friday - 9am to 5pm / Saturdays - 10am to 4pm
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GOOGLE MAP */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-lg">

          <iframe
            src="https://maps.google.com/maps?q=Lekki%20Phase%201%20Lagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#572649] py-24 text-center text-white">
        <h2 className="text-5xl font-serif mb-6">
          Ready To Create An Unforgettable Event?
        </h2>

        <p className="max-w-2xl mx-auto text-white/80 mb-10">
          From intimate celebrations to large-scale luxury experiences,
          Gadiel Events is here to bring your vision to life.
        </p>

        <button className="bg-white text-[#572649] px-8 py-4 rounded-full font-medium">
          Book A Consultation
        </button>
      </section>

    </main>
  );
}