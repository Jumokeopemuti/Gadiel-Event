"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function AboutSection() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.25,
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f3ef] py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* YEAR */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
                y: -30,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      scale: 0.7,
                      y: -30,
                    }
              }
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="absolute -top-15 md:-top-20 left-65 md:left-120 -translate-x-1/2 z-10"
            >
              <h2 className="text-[90px] md:text-[130px] font-serif text-[#4d1e3f] leading-none">
                2018
              </h2>

              <p className="text-center uppercase tracking-[4px] text-[#a7488c]">
                Since
              </p>
            </motion.div>

            {/* MAIN IMAGE */}
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              transition={{
                duration: 0.5,
              }}
              className="w-[75%] overflow-hidden"
            >
              <Image
                src="/bigHero.jpg"
                alt="Event Decoration"
                width={700}
                height={900}
                className="w-full h-[600px] object-cover"
              />
            </motion.div>

            {/* FLOATING IMAGE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 80,
              }}
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
                duration: 0.9,
                delay: 0.4,
              }}
              whileHover={{
                y: -10,
              }}
              className="absolute bottom-[-50px] right-0 w-[55%] shadow-2xl"
            >
              <Image
                src="/about-small.jpeg"
                alt="Luxury Event"
                width={500}
                height={500}
                className="w-full h-[350px] object-cover"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p
              variants={fadeUp}
              animate={isInView ? "visible" : "hidden"}
              className="uppercase tracking-[5px] text-sm font-semibold mb-6"
            >
              Event Decoration & Styling
            </motion.p>

            <motion.h2
              variants={fadeUp}
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.15 }}
              className="font-serif text-5xl md:text-7xl leading-tight mb-8"
            >
              Creating unforgettable celebrations
            </motion.h2>

            <motion.p
              variants={fadeUp}
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-lg leading-9 mb-10"
            >
              We transform venues into breathtaking experiences through
              elegant décor, luxury floral arrangements, stage styling,
              wedding setups, birthday themes, and corporate event designs.
            </motion.p>

            <motion.div
              variants={fadeUp}
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.45 }}
              className="mb-10"
            >
              <h4 className="font-bold text-xl mb-2">
                AVAILABLE HOURS
              </h4>

              <p className="text-lg">
                MON - FRI: 9 AM – 6 PM
              </p>

              <p className="text-lg">
                SATURDAY: 10 AM – 5 PM
              </p>
            </motion.div>

<Link href="/about">
            <motion.button
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      y: 40,
                      scale: 0.9,
                    }
              }
              transition={{
                duration: 0.7,
                delay: 0.6,
              }}
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="bg-[#572649] text-white px-10 py-5 text-lg font-semibold hover:opacity-90 transition cursor-pointer"
            >
              About Us
            </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* DECORATIVE FLOWER */}
        <motion.div
          animate={
            isInView
              ? {
                  opacity: 0.2,
                  rotate: 0,
                }
              : {
                  opacity: 0,
                  rotate: -25,
                }
          }
          transition={{
            duration: 1,
          }}
          className="absolute bottom-0 right-0"
        >
          <Image
            src="/flower-decoration.png"
            alt=""
            width={350}
            height={350}
          />
        </motion.div>
      </div>
    </section>
  );
}