"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const categories = [
  "All",
  "Weddings",
  "Corporate",
  "Social",
  "Memorial",
];


const images = [
  {
    id:1,
    category:"Weddings",
    image:"/show12.webp",
    title:"Luxury Wedding"
  },

  {
    id:2,
    category:"Corporate",
    image:"/show1.webp",
    title:"Corporate Gala"
  },

  {
    id:3,
    category:"Social",
    image:"/show2.jpg",
    title:"Birthday Celebration"
  },

  {
    id:4,
    category:"Weddings",
    image:"/show3.jpg",
    title:"Wedding Styling"
  },

  {
    id:5,
    category:"Memorial",
    image:"/show4.jpg",
    title:"Private Gathering"
  },
];

export default function GalleryAdd() {

  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    active === "All"
      ? images
      : images.filter(
          (item) => item.category === active
        );

  return (
    <section className="bg-[#f7f4f1] min-h-screen py-24">

      <div className="max-w-[1450px] mx-auto px-6">

        {/* HEADER */}

        <div className="text-center mb-20">

          <p className="
            uppercase
            tracking-[4px]
            text-xs
            text-[#8b6c58]
            mb-6
          ">
            Portfolio Gallery
          </p>

          <h1 className="
            font-serif
            text-[#231b1c]
            text-5xl
            md:text-7xl
            mb-12
          ">
            Captured Event Moments
          </h1>

          {/* FILTERS */}

          <div className="
            flex
            flex-wrap
            justify-center
            gap-4
          ">

            {categories.map((cat) => (

              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`
                  px-7 py-3 rounded-full
                  transition-all duration-500

                  ${
                    active === cat
                      ? "bg-[#231b1c] text-white"
                      : "bg-[#ece4dc] text-[#231b1c] hover:bg-[#231b1c] hover:text-white"
                  }
                `}
              >
                {cat}
              </button>

            ))}

          </div>

        </div>

        {/* GRID */}

        <motion.div
          layout
          className="grid lg:grid-cols-2 gap-8"
        >

          {/* LEFT LARGE IMAGE */}

          {filtered[0] && (

            <motion.div
              layout
              onClick={() =>
                setSelected(filtered[0])
              }
              className="
                relative
                h-[900px]
                overflow-hidden
                cursor-pointer
                group
              "
            >

              <Image
                src={filtered[0].image}
                alt={filtered[0].title}
                fill
                className="
                  object-cover
                  transition-all
                  duration-700
                  group-hover:scale-110
                "
              />

              <div className="
                absolute inset-0
                bg-black/0
                group-hover:bg-black/35
                transition-all duration-500
              " />

              <div className="
                absolute
                bottom-10
                left-10

                opacity-0
                translate-y-12

                group-hover:opacity-100
                group-hover:translate-y-0

                transition-all duration-700
              ">

                <p className="
                  text-white/70
                  uppercase
                  tracking-[3px]
                  mb-3
                ">
                  {filtered[0].category}
                </p>

                <h3 className="
                  font-serif
                  text-white
                  text-5xl
                ">
                  {filtered[0].title}
                </h3>

              </div>

            </motion.div>

          )}

          {/* RIGHT GRID */}

          <motion.div
            layout
            className="grid grid-cols-2 gap-8"
          >

            {filtered.slice(1).map((item) => (

              <motion.div
                layout
                key={item.id}
                onClick={() =>
                  setSelected(item)
                }
                className="
                  relative
                  h-[435px]
                  overflow-hidden
                  cursor-pointer
                  group
                "
              >

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div className="
                  absolute inset-0
                  bg-black/0
                  group-hover:bg-black/30
                  transition-all duration-500
                " />

                <div className="
                  absolute
                  bottom-7
                  left-7

                  opacity-0
                  translate-y-10

                  group-hover:opacity-100
                  group-hover:translate-y-0

                  transition-all duration-700
                ">

                  <p className="
                    text-white/70
                    uppercase
                    tracking-[2px]
                    text-xs
                    mb-2
                  ">
                    {item.category}
                  </p>

                  <h4 className="
                    font-serif
                    text-white
                    text-2xl
                  ">
                    {item.title}
                  </h4>

                </div>

              </motion.div>

            ))}

          </motion.div>

        </motion.div>

      </div>

      {/* LIGHTBOX */}

      <AnimatePresence>

        {selected && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-50
              bg-black/90

              flex
              items-center
              justify-center
              p-8
            "
          >

            <button
              onClick={() =>
                setSelected(null)
              }
              className="
                absolute
                top-8
                right-8
                text-white
              "
            >
              <X size={40}/>
            </button>

            <motion.div
              initial={{ scale: .85 }}
              animate={{ scale: 1 }}
              exit={{ scale: .85 }}
              className="
                relative
                w-full
                max-w-[1200px]
                h-[85vh]
              "
            >

              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-contain"
              />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}
