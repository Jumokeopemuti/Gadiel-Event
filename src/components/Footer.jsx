"use client";

import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.2,
  });

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Booking", path: "/booking" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: FaLinkedinIn,
      link: "https://www.linkedin.com/in/olajumoke-opemuti-24b73011/",
    },
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/gadielevents_/",
    },
    {
      icon: FaXTwitter,
      link: "https://x.com/yourusername",
    },
  ];

  return (
    <footer
      ref={sectionRef}
      className="bg-[#050814] text-white overflow-hidden"
    >

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 120 }
            }
            transition={{ duration: 0.9 }}
            className="-mt-22"
          >
            <img
              src="/logo.png"
              alt="Gadiel Events"
              className="w-58 mb-6"
            />

            <p className="text-white/80 -mt-20 leading-relaxed">
              Gadiel Events specializes in luxury event decoration,
              wedding styling, birthday celebrations, corporate events,
              engagements, and unforgettable event experiences.
            </p>

            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="
          p-3
          rounded-full
          bg-red-500/30
          hover:bg-white
          hover:text-[#572649]
          transition-all
          duration-300
        "
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 120 }
            }
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {links.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -30 }
                  }
                  transition={{
                    delay: 0.2 + index * 0.1,
                  }}
                >
                  <Link
                    href={item.path}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition"
                  >
                    <ArrowUpRight size={16} />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* SERVICES */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 120 }
            }
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-5">
              Our Services
            </h3>

            <ul className="space-y-3 text-white/80">
              {[
                "Wedding Decoration",
                "Birthday Celebrations",
                "Corporate Events",
                "Engagement Parties",
                "Baby Shower Decoration",
                "Luxury Event Styling",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -30 }
                  }
                  transition={{
                    delay: 0.25 + index * 0.08,
                  }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 120 }
            }
            transition={{ duration: 0.9, delay: 0.45 }}
          >
            <h3 className="text-xl font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4">
              {[
                { icon: Phone, text: "+234 706 644 3195" },
                { icon: Mail, text: "gadielevents@gmail.com" },
                { icon: MapPin, text: "Lagos, Nigeria" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: 40 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: 40 }
                  }
                  transition={{
                    delay: 0.3 + index * 0.1,
                  }}
                >
                  <item.icon className="mt-1" size={18} />
                  <span className="text-white/80">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
        }
        transition={{ duration: 0.8, delay: 0.6 }}
        className="border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} Gadiel Events. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-white/70">
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </motion.div>

    </footer>
  );
}