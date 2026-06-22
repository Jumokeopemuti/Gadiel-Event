"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  ArrowRight
} from "lucide-react";

export default function BookConsultationPage() {


  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    budget: "",
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
      setLoading(true);

      const res = await fetch(
        "/api/consultations",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
          "Failed to submit"
        );
      }

      alert(
        "Consultation booked successfully!"
      );

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <main className="bg-[#f8f5f1]">

      {/* HERO */}

      <section className="
        relative
        h-[85vh]
        overflow-hidden
      ">

        <Image
          src="/show7.jpg"
          alt="consultation"
          fill
          priority
          className="object-cover"
        />

        <div className="
          absolute inset-0
          bg-black/55
        "/>

        <div className="
          absolute inset-0
          flex
          items-center
          justify-center
          text-center
          px-6
        ">

          <div>

            <p className="
              uppercase
              tracking-[5px]
              text-white/80
              text-xs
              mb-8
            ">
              Luxury Event Planning
            </p>

            <h1 className="
              font-serif
              text-white
              text-5xl
              md:text-8xl
              leading-tight
              mb-8
            ">
              Book A Consultation
            </h1>

            <p className="
              max-w-3xl
              mx-auto
              text-white/90
              text-lg
              md:text-xl
              leading-9
            ">
              Begin your planning journey with
              Gadiel Event. Let’s discuss your
              vision, objectives, and create an
              unforgettable experience.
            </p>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="py-28">

        <div className="
          max-w-[1450px]
          mx-auto
          px-6
        ">

          <div className="
            grid
            lg:grid-cols-[1fr_650px]
            gap-20
          ">

            {/* LEFT */}

            <div>

              <p className="
                uppercase
                tracking-[4px]
                text-xs
                text-[#572649]
                mb-6
              ">
                Consultation Experience
              </p>

              <h2 className="
                font-serif
                text-5xl
                leading-tight
                text-[#232323]
                mb-10
              ">
                Let’s Create Something Extraordinary
              </h2>

              <p className="
                text-[#555]
                text-lg
                leading-10
                mb-12
              ">
                Whether you're planning a wedding,
                corporate gathering, luxury social
                celebration, or memorial event,
                our consultation session helps us
                understand your goals, aesthetic,
                and event vision.
              </p>

              {/* PROCESS */}

              <div className="space-y-10">

                {[
                  "Discovery Call",
                  "Creative Strategy Session",
                  "Proposal & Planning Roadmap"
                ].map((item, index) => (

                  <div
                    key={index}
                    className="
                      flex
                      gap-6
                    "
                  >

                    <div className="
                      w-14
                      h-14
                      rounded-full
                      bg-[#572649]
                      text-white
                      flex
                      items-center
                      justify-center
                      shrink-0
                    ">
                      {index + 1}
                    </div>

                    <div>

                      <h3 className="
                        font-serif
                        text-2xl
                        mb-3
                      ">
                        {item}
                      </h3>

                      <p className="
                        text-[#666]
                        leading-8
                      ">
                        Premium planning guidance
                        tailored to your event goals.
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              {/* CONTACT */}

              <div className="
                mt-20
                bg-white
                p-10
                shadow-sm
              ">

                <h3 className="
                  font-serif
                  text-3xl
                  mb-10
                ">
                  Contact Information
                </h3>

                <div className="space-y-8">

                  <div className="flex gap-5">

                    <Phone className="text-[#572649]" />

                    <span>+234 800 000 0000</span>

                  </div>

                  <div className="flex gap-5">

                    <Mail className="text-[#572649]" />

                    <span>
                      info@gadielevent.com
                    </span>

                  </div>

                  <div className="flex gap-5">

                    <MapPin className="text-[#572649]" />

                    <span>
                      Lekki, Lagos, Nigeria
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* FORM */}

            <div className="
              bg-white
              p-10
              md:p-14
              shadow-[0_20px_80px_rgba(0,0,0,.08)]
            ">

              <h2 className="
                font-serif
                text-4xl
                mb-12
              ">
                Schedule Your Consultation
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >

                <div className="
                  grid
                  md:grid-cols-2
                  gap-8
                ">

                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="inputStyle border border-gray-200 py-3 pl-4"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="inputStyle border border-gray-200 py-3 pl-4"
                  />

                </div>

                <div className="
                  grid
                  md:grid-cols-2
                  gap-8
                ">

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="inputStyle border border-gray-200 py-3 pl-4"
                  />

                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="inputStyle border border-gray-200"
                  >
                    <option value="">
                      Select Event Type
                    </option>

                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Social Event</option>
                    <option>Memorial Event</option>
                  </select>

                </div>

                <div className="
                  grid
                  md:grid-cols-2
                  gap-8
                ">

                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="inputStyle border border-gray-200 py-3 pl-4"
                  />

                  <input
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Estimated Budget"
                    className="inputStyle border border-gray-200 py-3 pl-4"
                  />

                </div>

                <textarea
                  rows={7}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event..."
                  className="inputStyle resize-none border border-gray-200 py-3 pl-4 w-full"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="
    bg-[#232323]
    text-white
    px-10
    py-5
    uppercase
    tracking-[3px]
    text-sm
    flex
    items-center
    gap-4
    hover:bg-[#572649]
    transition-all
    disabled:opacity-50
  "
                >
                  {loading
                    ? "Submitting..."
                    : "Book Consultation"}

                  <ArrowRight size={18} />
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}