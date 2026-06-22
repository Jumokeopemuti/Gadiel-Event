"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function SocialEventsSection() {
  const router = useRouter();

  return (
    <section className="bg-[#f8f5f2] py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div>
            <p className="uppercase tracking-[4px] text-sm text-[#8b6c58] mb-6">
              Social Celebrations
            </p>

            <h2 className="font-serif text-[#231b1c] text-5xl md:text-7xl leading-[1.05] mb-8">
              Creating meaningful moments worth remembering
            </h2>

            <p className="text-[#666] text-lg leading-[2] mb-10">
              We craft unforgettable social celebrations that reflect
              your story with elegance, emotion, and intentional detail.
              From intimate gatherings to grand milestone occasions,
              every experience is thoughtfully designed to leave
              a lasting impression.
            </p>

            {/* SERVICES LIST */}
            <div className="space-y-5 mb-12 text-[#231b1c]">
              {[
                "Weddings",
                "Birthday Celebrations",
                "Proposals",
                "Baby Showers",
                "Bridal Showers",
                "Anniversary Celebrations",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-b border-[#e6ddd8] pb-4"
                >
                  <span className="text-[#8b6c58] text-sm">01</span>
                  <p className="text-xl font-medium">{item}</p>
                </div>
              ))}
            </div>

           
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[750px] overflow-hidden rounded-[30px]">
            <Image
              src="/show6.jpg"
              alt="Luxury Social Event"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-black/20" />

            {/* FLOATING TEXT */}
            <div className="absolute bottom-10 left-10 text-white">
              <p className="uppercase tracking-[4px] text-sm mb-4">
                Crafted Experiences
              </p>

              <h3 className="font-serif text-4xl leading-tight max-w-md">
                Celebrations designed with beauty and precision
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}