"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

const testimonials = [
  {
    name: "Mrs Absede Oloruntegbe",
    role: "Birthday Client",
    image: "/passenger6.jpeg",
    text: "Gadiel Event Planners transformed our birthday party into a breathtaking experience of elegance and sophistication. Every detail was executed flawlessly, creating memories we will treasure forever.",
  },
  {
    name: "Ms. Cecilia Akintomide",
    role: "Birthday Client",
    image: "/passenger4.webp",
    text: "Their attention to detail and exceptional coordination elevated our birthday celebration beyond expectations. The experience was seamless, polished, and deeply impressive.",
  },
  {
    name: "Yejide & Olasunkanmi",
    role: "Wedding Client",
    image: "/tes1.jpg",
    text: "The creativity, professionalism, and thoughtful execution made our celebration truly extraordinary. Every guest was captivated by the beauty and elegance of the event.",
  },
];

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    amount: 0.25,
  });

  return (
    <section
      ref={sectionRef}
      className="bg-[#f8f4f1] py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 min-h-[820px]">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 120 }
            }
            transition={{ duration: 0.9 }}
            className="flex flex-col bg-white justify-center px-8 lg:px-20"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.2 }}
              className="uppercase tracking-[0.4em] text-[12px] text-[#8a6a72] mb-5"
            >
              Client Stories
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{ delay: 0.3 }}
              className="font-serif text-[#1c1718] text-5xl md:text-7xl leading-[0.95]"
            >
              Words from
              <br />
              our clients
            </motion.h2>

            <div className="w-20 h-[1px] bg-[#bfa5ac] mt-8 mb-16" />

            {/* Sliding Content */}
            <div className="relative min-h-[260px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ x: 120, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -120, opacity: 0 }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <p className="text-[#5b4f50] text-xl leading-[1.9] italic max-w-[620px]">
                    “{testimonials[active].text}”
                  </p>

                  <div className="mt-10">
                    <h4 className="font-serif text-3xl text-[#1f1a1b]">
                      {testimonials[active].name}
                    </h4>

                    <p className="uppercase tracking-[0.25em] text-sm text-[#8a6a72] mt-3">
                      {testimonials[active].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Clickable Profiles */}
            <div className="flex gap-6 mt-16">
              {testimonials.map((item, index) => {
                const isActive = active === index;

                return (
                  <motion.button
                    key={index}
                    onClick={() => setActive(index)}
                    initial={{ opacity: 0, y: 40 }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 40 }
                    }
                    transition={{
                      delay: 0.4 + index * 0.15,
                    }}
                    className="group"
                  >
                    <div
                      className={`
                        relative overflow-hidden rounded-full transition-all duration-500
                        ${
                          isActive
                            ? "w-24 h-24 ring-4 ring-[#caa7af] scale-110"
                            : "w-20 h-20 opacity-70 hover:opacity-100"
                        }
                      `}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 120 }
            }
            transition={{ duration: 1 }}
            className="relative overflow-hidden"
          >
            <Image
              src="/show6.jpg"
              alt="Luxury Event"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/35" />

            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 80 }
              }
              transition={{ delay: 0.3 }}
              className="absolute inset-0 flex flex-col justify-end p-16"
            >
              <p className="uppercase tracking-[0.35em] text-white/80 text-sm mb-4">
                Experience Excellence
              </p>

              <h3 className="font-serif text-white text-6xl md:text-8xl leading-[0.95]">
                Elegant
                <br />
                Celebrations
              </h3>

              <p className="text-white/80 mt-8 text-lg max-w-md leading-[1.8]">
                Every event is thoughtfully designed to reflect sophistication,
                beauty, and unforgettable luxury.
              </p>
<Link href="/check-availability">
              <button className="mt-12 px-10 py-5 border border-white text-white uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500">
                Check Availabilty
              </button>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}