"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  { number: 38, label: "Projects" },
  { number: 25, label: "Clients" },
  { number: 8, label: "Years" },
  { number: 15, label: "Services" },
];

function CountUp({ value, isInView }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, isInView ? value : 0, {
      duration: 2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [isInView, value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default function StatsSection() {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: false, // animate every time scroll in/out
  });

  return (
    <section ref={ref} className="bg-[#050814] py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center py-16 group"
            >
              {/* Animated Background Number */}
              <span className="absolute text-[9rem] md:text-[11rem] font-serif text-white/6 leading-none select-none">
                <CountUp value={stat.number} isInView={inView} />
              </span>

              {/* Label */}
              <h3 className="relative z-10 text-white text-2xl md:text-3xl font-serif transition-all duration-500 group-hover:text-[#8f1f4d]">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}