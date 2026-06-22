"use client";

import { FiArrowUpRight } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    id: "01",
    title: "Wedding\nDecoration",
    description:
      "Elegant wedding styling, floral arrangements, aisle décor, reception backdrops, and luxury venue transformation.",
  },
  {
    id: "02",
    title: "Birthday\nCelebrations",
    description:
      "Creative birthday themes, balloon installations, custom backdrops, table styling, and memorable party experiences.",
  },
  {
    id: "03",
    title: "Corporate\nEvents",
    description:
      "Professional event setup for conferences, product launches, award ceremonies, exhibitions, and business gatherings.",
  },
  {
    id: "04",
    title: "Proposal &\nEngagement",
    description:
      "Romantic proposal setups, engagement décor, intimate celebrations, and luxury themed experiences.",
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      className="bg-[#f7f3ef] py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Decorative Image */}
        <motion.img
          src="/under7.jpg"
          alt="decor"
          animate={
            isInView
              ? {
                  opacity: 0.2,
                  rotate: 0,
                }
              : {
                  opacity: 0,
                  rotate: 15,
                }
          }
          transition={{
            duration: 1,
          }}
          className="absolute top-8 right-0 w-32 md:w-84 pointer-events-none"
        />

        {/* Header */}
        <motion.div
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 80,
                }
          }
          transition={{
            duration: 0.8,
          }}
          className="mb-20"
        >
          <p className="uppercase tracking-[4px] text-sm text-[#572649] mb-4 font-medium">
            What We Do
          </p>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight max-w-3xl text-[#1a1a1a]">
            Creating unforgettable event experiences
          </h2>
        </motion.div>

        {/* Services */}
        <div className="border-t border-gray-300">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{
                opacity: 0,
                y: 120,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 120,
                    }
              }
              transition={{
                duration: 0.8,
                delay: index * 0.15,
              }}
              className="
                group
                border-b border-gray-300
                py-10
                transition-all duration-500
                hover:bg-white
                hover:px-6
              "
            >
              <div className="grid lg:grid-cols-4 gap-8 items-center">

                {/* Number */}
                <div>
                  <motion.h3
                    whileHover={{
                      scale: 1.15,
                    }}
                    className="font-serif text-4xl md:text-5xl text-[#572649]"
                  >
                    {service.id}
                  </motion.h3>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl leading-tight whitespace-pre-line text-[#111]">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-600 leading-8 text-base md:text-lg">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-start lg:justify-end">
                  <motion.button
                    whileHover={{
                      rotate: 45,
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="
                      w-16 h-16
                      rounded-full
                      border border-gray-300
                      flex items-center justify-center
                      text-xl
                      transition-all duration-500
                      group-hover:bg-[#572649]
                      group-hover:text-white
                      group-hover:border-[#572649]
                    "
                  >
                    <FiArrowUpRight />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}