"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch("/api/event");
      const data = await res.json();

      const formattedEvents = data.map((event) => ({
        _id: event._id,
        title: event.title,
        location: event.location,
        date: event.date,
        endDate: event.endDate,
        image: event.imageUrl,
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="min-h-screen bg-[#f7f4f1] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-[#973f72] text-sm">
            Event Calendar
          </p>

          <h1 className="font-serif text-5xl md:text-7xl mt-4">
            All Events
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="relative h-[280px]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="p-6">

                <h2 className="font-serif text-3xl mb-4">
                  {event.title}
                </h2>

                <p className="text-gray-600 mb-2">
                  📍 {event.location}
                </p>

                <p className="text-gray-500 text-sm">
                  {new Date(event.date).toLocaleString()}
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Ends: {new Date(event.endDate).toLocaleString()}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}