"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Luxury Burial Styling",
    category: "PORTFOLIO",
    image: "/gpic1.jpg",
  },
  {
    title: "Elegant Entrance Styling",
    category: "PORTFOLIO",
    image: "/gpic2.jpg",
  },
  {
    title: "Floral Table Setup",
    category: "PORTFOLIO",
    image: "/gal1.jpg",
  },
  {
    title: "Luxury Outdoor Event",
    category: "PORTFOLIO",
    image: "/show4.jpg",
  },
  {
    title: "Premium Event Décor",
    category: "PORTFOLIO",
    image: "/show5.jpg",
  },
];

export default function PortfolioGallery() {
  const [active, setActive] = useState(0);

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      className="bg-[#f7f3ef] py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
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
          className="mb-16"
        >
          <p className="uppercase tracking-[4px] text-sm text-[#572649] mb-4">
            Portfolio
          </p>

          <h2 className="font-serif text-5xl md:text-7xl leading-tight">
            Our Featured Works
          </h2>
        </motion.div>

        <div className="flex gap-5 items-start">
          {items.map((item, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setActive(index)}
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
                className={`
                  group cursor-pointer
                  transition-all duration-700
                  ease-[cubic-bezier(.22,1,.36,1)]

                  ${isActive ? "w-[420px]" : "w-[170px]"}
                `}
              >
                {/* Image */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className={`
                    relative overflow-hidden
                    transition-all duration-700
                    ease-[cubic-bezier(.22,1,.36,1)]

                    ${isActive ? "h-[320px]" : "h-[520px]"}
                  `}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`
                      object-cover
                      transition-all duration-700
                      ${isActive ? "scale-105" : "scale-100"}
                    `}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </motion.div>

                {/* Content */}
                <div
                  className={`
                    overflow-hidden
                    transition-all duration-700
                    ease-[cubic-bezier(.22,1,.36,1)]

                    ${
                      isActive
                        ? "max-h-[250px] opacity-100 mt-6"
                        : "max-h-0 opacity-0 mt-0"
                    }
                  `}
                >
                  <p className="uppercase tracking-[4px] text-xs text-[#b38a55] mb-4">
                    {item.category}
                  </p>

                  <h3 className="font-serif text-3xl text-[#1f1717] leading-tight">
                    {item.title}
                  </h3>

<Link href="/gallery">
                  <button className="mt-7 flex items-center gap-2 text-[#1f1717] group/btn cursor-pointer">
                    Explore

                    <ArrowUpRight
                      size={18}
                      className="
                        transition-transform duration-500
                        group-hover/btn:translate-x-1
                        group-hover/btn:-translate-y-1
                      "
                    />
                  </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}