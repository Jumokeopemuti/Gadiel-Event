"use client";

import { FaCheck } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function FriendlyService() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.25,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f5f3f1] py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8 items-center">

        {/* Left Image */}
        <motion.div
          initial={{
            opacity: 0,
            x: -100,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {
                  opacity: 0,
                  x: -100,
                }
          }
          transition={{
            duration: 0.9,
          }}
          className="relative h-[500px] overflow-hidden"
        >
          <motion.img
            whileHover={{
              scale: 1.05,
            }}
            transition={{
              duration: 0.5,
            }}
            src="/image1.jfif"
            alt="Event decor"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
            scale: 0.9,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
              : {
                  opacity: 0,
                  y: 80,
                  scale: 0.9,
                }
          }
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="relative h-[500px] overflow-hidden group cursor-pointer"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/video5.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {
                  opacity: 0,
                  x: 100,
                }
          }
          transition={{
            duration: 0.9,
            delay: 0.3,
          }}
          className="lg:pl-12"
        >
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            transition={{
              delay: 0.4,
            }}
            className="uppercase tracking-[4px] text-sm text-[#572649] mb-6"
          >
            Welcome!
          </motion.p>

          <motion.h2
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 40,
                  }
            }
            transition={{
              delay: 0.5,
            }}
            className="font-serif text-5xl leading-tight text-[#1a1a1a] mb-8"
          >
            Super friendly <br />
            customer service
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 40,
                  }
            }
            transition={{
              delay: 0.6,
            }}
            className="text-gray-600 leading-8 mb-10"
          >
            We create unforgettable event experiences with exceptional service,
            elegant décor styling, and seamless coordination tailored to your
            celebration.
          </motion.p>

          {/* Checklist */}
          <div className="space-y-5 mb-10">
            {[
              "Event fits your budget",
              "Delicious menu",
              "Professional coordination",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        x: 0,
                      }
                    : {
                        opacity: 0,
                        x: 40,
                      }
                }
                transition={{
                  delay: 0.7 + index * 0.15,
                  duration: 0.5,
                }}
                className="flex items-center gap-4"
              >
                <FaCheck className="text-[#d39a2a] text-sm" />
                <span className="text-lg text-[#222]">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Button */}

          <Link href="/client-experience">
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
              delay: 1,
            }}
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="px-10 py-4 border-2 border-[#572649] rounded-full hover:bg-[#572649] hover:text-white hover:border-[#572649] transition-all duration-500"
          >
            Read More
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}