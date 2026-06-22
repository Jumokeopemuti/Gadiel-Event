"use client";

import Image from "next/image";
import { CalendarDays, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";


export default function NextEvents() {
  const [events, setEvents] = useState([]);
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.2,
  });


  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
  try {
    const res = await fetch("/api/event");

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await res.json();

    const formattedEvents = data.map((event) => ({
      _id: event._id,

      day: new Date(event.date)
        .getDate()
        .toString()
        .padStart(2, "0"),

      month: new Date(event.date).toLocaleDateString(
        "en-US",
        {
          month: "short",
          year: "numeric",
        }
      ),

      title: event.title,
      location: event.location,
      date: event.date,
      endDate: event.endDate,
      image: event.imageUrl,
    }));

    setEvents(formattedEvents);
  } catch (error) {
    console.error("Fetch Events Error:", error);
  }
}

  return (
    <section
      ref={sectionRef}
      className="bg-[#050814] text-white py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[320px_1fr]">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 120 }
            }
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#973f72]">
              Booking Calendar
            </p>

            <h2 className="text-5xl md:text-6xl font-serif leading-tight">
              Projects & Events
            </h2>
          </motion.div>

          {/* RIGHT SIDE */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 80 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-14 flex flex-col justify-between gap-8 lg:flex-row"
            >
              <p className="max-w-xl text-gray-400 leading-8 text-lg">
                Discover our upcoming luxury event experiences crafted with
                elegance, precision, and unforgettable celebration styling.
              </p>

              <Link
                href="/events"
                className="group flex items-center gap-2 text-white hover:text-[#973f72] transition"
              >
                View More

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>
            </motion.div>

            {/* EVENTS LIST */}
            <div className="space-y-8">

              {events.length === 0 && (
                <p className="text-gray-400">
                  No upcoming events available.
                </p>
              )}
            {events.slice(-3).reverse().map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 120 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 120 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                  }}
                  className="
                    group
                    grid
                    md:grid-cols-[80px_150px_1fr_120px]
                    gap-6
                    items-center
                    border-b
                    border-white/10
                    pb-8
                    transition-all
                    duration-500
                    hover:bg-white/5
                    hover:px-6
                    rounded-xl
                  "
                >
                  {/* DATE */}
                  <div>
                    <h3 className="text-5xl font-serif text-white group-hover:text-[#973f72] transition">
                      {event.day}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {event.month}
                    </p>
                  </div>

                  {/* IMAGE */}
                  <div className="relative h-28 w-full md:w-36 overflow-hidden rounded-lg">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h3 className="mb-3 text-2xl md:text-3xl font-serif group-hover:text-[#973f72] transition">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="font-medium text-white">
                        {event.location}
                      </span>

                      <div className="flex items-center gap-2 text-gray-400">
                        <CalendarDays size={14} className="text-[#973f72]" />
                        <span>
                          {event.date} — {event.endDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}