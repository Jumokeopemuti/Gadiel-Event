"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";


const galleryImages = [
  {
    image: "/hero7.jpg",
    title: "Luxury Wedding Decoration",
    description:
      "Elegant wedding setups with floral arrangements and premium décor.",
    link: "/services/luxury-events",
  },
  {
    image: "/hero6.jpg",
    title: "Birthday Celebration",
    description:
      "Creative birthday decorations tailored to your theme and budget.",
    link: "/services/social-events",
  },
  {
    image: "/birthday.jpg",
    title: "Corporate Events",
    description:
      "Professional event styling for conferences, launches and galas.",
    link: "/services/corporate-events",
  },
];






const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
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

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

export default function Hero() {



  
const [isDesktop, setIsDesktop] = useState(false);

useEffect(() => {
  const checkScreen = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  checkScreen();

  window.addEventListener("resize", checkScreen);

  return () =>
    window.removeEventListener("resize", checkScreen);
}, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Decorative Shapes */}
        <motion.img
          src="/under1.png"
          alt=""
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute left-0 top-10 w-32 md:w-72"
        />

        <motion.img
          src="/under6.png"
          alt=""
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute -right-10 top-0 w-32 md:w-56"
        />

        {/* Heading */}
        <motion.div
          className="relative z-10 mb-16 text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="mb-4 uppercase tracking-[8px] text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Premium Event Planners
          </motion.p>

          <motion.h1
            className="font-serif text-6xl leading-none text-[#572649] md:text-8xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Gadiel Events
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Creating unforgettable experiences through luxury event planning,
            elegant decorations, and seamless execution.
          </motion.p>
        </motion.div>

        {/* Gallery */}
        <motion.div
          className="grid gap-8 lg:grid-cols-[1fr_1.3fr_1fr]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {galleryImages.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              transition={{
                delay: index === 1 ? 0.4 : index * 0.2,
              }}
              whileHover={
                isDesktop
                  ? { y: -15 }
                  : {}
              }
              className={`
                group relative cursor-pointer overflow-hidden shadow-xl
                ${index === 1 ? "lg:mt-0" : "lg:mt-12"}
              `}
            >
              {/* Image */}
              <div className="overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={700}
                  height={900}
                  className={`
      w-full object-cover
      transition-transform duration-700
      lg:group-hover:scale-110
      ${index === 1
                      ? "h-[620px]"
                      : "h-[500px]"
                    }
    `}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content */}
              <motion.div
                className="
    absolute bottom-0 left-0 right-0
    p-6 md:p-8
  "
              >
                <div
                  className="
      rounded-2xl border border-white/20
      bg-white/10 p-5 backdrop-blur-md

      opacity-100 translate-y-0

      lg:opacity-0
      lg:translate-y-10
      lg:group-hover:opacity-100
      lg:group-hover:translate-y-0

      transition-all duration-500
    "
                >
                  <h3 className="mb-3 text-2xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/80">
                    {item.description}
                  </p>

                  <Link
                    href={item.link}
                    className="
        mt-5 flex items-center gap-2
        text-white
        transition-all
        hover:gap-4
      "
                  >
                    Explore →
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          className="mx-auto mt-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg leading-relaxed text-gray-600">
            Transforming ordinary spaces into unforgettable experiences.
            Weddings, birthdays, corporate events, engagements, and luxury
            celebrations designed with creativity and elegance.
          </p>


          <Link href="/book-consultation">
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
              group relative mt-10 overflow-hidden
              rounded-full bg-[#572649]
              px-8 py-4 font-semibold text-white
              transition-all duration-500
              hover:shadow-[0_20px_50px_rgba(87,38,73,.35)]
              cursor-pointer
            "
            >
              <span
                className="
                absolute inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
                transition-transform duration-1000
                group-hover:translate-x-full
              "
              />


              <span className="relative z-10">
                Book Consultation
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}