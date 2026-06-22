"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const events = [
  {
    title: "Luxury Wedding Styling",
    category: "Wedding Decor",
    image: "/show6.jpg",
  },

  {
    title: "Corporate Event Experience",
    category: "Corporate Events",
    image: "/cop2.png",
  },

  {
    title: "Elegant Birthday Setup",
    category: "Social Celebrations",
    image: "/hero-1.jpg",
  },
];

export default function EventCollection() {
  return (
    <section className="bg-[#f7f4f2] py-28 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <div className="text-center mb-16">

          <h2 className="
            font-serif
            text-[#1d1820]
            text-5xl
            md:text-7xl
            leading-none
          ">
            Our Signature Events
          </h2>

          <p className="
            mt-5
            italic
            text-[#a28ae0]
            text-3xl
            font-light
          ">
            explore our collection
          </p>

        </div>

        {/* GRID */}

        <div className="grid md:grid-cols-3 gap-8">

          {events.map((item, index) => (

            <div
              key={index}
              className="
                relative
                group
                overflow-hidden
                h-[520px]
                cursor-pointer
              "
            >

              {/* IMAGE */}

              <Image
                src={item.image}
                alt={item.title}
                fill
                className="
                  object-cover
                  transition-all
                  duration-700
                  group-hover:scale-110
                "
              />

              {/* PURPLE OVERLAY */}

              <div className="
                absolute inset-0
                bg-black/80
                opacity-0
                transition-all
                duration-700

                group-hover:opacity-100
              " />

              {/* CONTENT */}

              <div className="
                absolute inset-0
                flex flex-col
                justify-end
                p-10
              ">

                <div className="
                  transform
                  translate-y-28
                  opacity-0

                  transition-all
                  duration-700
                  ease-out

                  group-hover:translate-y-0
                  group-hover:opacity-100
                ">

                  <p className="
                    uppercase
                    tracking-[3px]
                    text-sm
                    text-white/80
                    mb-4
                  ">
                    {item.category}
                  </p>

                  <h3 className="
                    font-serif
                    text-white
                    text-4xl
                    leading-tight
                    mb-8
                  ">
                    {item.title}
                  </h3>

                  <button className="
                    inline-flex
                    items-center
                    gap-3
                    bg-[#f0b4c8]
                    text-white
                    px-8
                    py-4
                    rounded-full

                    hover:bg-white
                    hover:text-[#8f6be8]

                    transition
                  ">
                    Explore

                    <ArrowUpRight size={18}/>
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      </div>
    </section>
  );
}