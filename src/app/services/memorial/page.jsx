"use client";

import Image from "next/image";
import { Flower2, HeartHandshake, Users } from "lucide-react";
import Link from "next/link";

export default function MemorialGatheringsPage() {
  return (
    <section className="bg-[#f7f4f1] overflow-hidden">

      {/* HERO */}
      <div className="relative h-[90vh] overflow-hidden">
        <Image
          src="/gpic1.jpg"
          alt="Corporate Events"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="uppercase tracking-[8px] mb-4">
              Professional Event Solutions
            </p>

            <h1 className="text-6xl md:text-8xl font-serif mb-6">
              Memorial Events
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-gray-200">
              From elegant ceremony coordination and venue setup to floral
              styling, reception arrangements, and personalized tributes,
              our team creates respectful experiences tailored to the wishes
              of families and loved ones.
            </p>
          </div>
        </div>


      </div>
      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* LEFT CONTENT */}

        <div className="
          flex
          flex-col
          justify-center
          px-8
          lg:px-20
          py-20
        ">

          <p className="
            uppercase
            tracking-[4px]
            text-xs
            text-[#8c6c58]
            mb-8
          ">
            Memorial & Special Gatherings
          </p>

          <h1 className="
            font-serif
            text-[#231b1c]
            text-5xl
            md:text-7xl
            leading-[0.95]
            max-w-[760px]
          ">
            Honoring memories with grace,
            dignity and thoughtful experiences
          </h1>

          <p className="
            mt-10
            text-[#686060]
            text-lg
            leading-[2]
            max-w-[620px]
          ">
            We provide compassionate planning and refined event
            coordination for memorial gatherings, burial ceremonies,
            remembrance services, and private family occasions —
            ensuring every detail reflects dignity, comfort,
            and heartfelt celebration of life.
          </p>

          <button className="
            mt-12
            w-fit
            px-10
            py-5
            rounded-full
            border
            border-[#231b1c]

            hover:bg-[#231b1c]
            hover:text-white

            transition-all
            duration-500
          ">
            Discuss Your Event
          </button>

        </div>

        {/* RIGHT IMAGE */}

        <div className="relative min-h-[650px]">

          <Image
            src="/memo1.jpg"
            alt="Memorial Gathering"
            fill
            className="object-cover"
          />

          <div className="
            absolute inset-0
            bg-black/20
          " />

        </div>

      </div>

      {/* SERVICES */}

      <div className="max-w-7xl mx-auto px-6 py-28">

        <div className="text-center mb-20">

          <p className="
            uppercase
            tracking-[3px]
            text-xs
            text-[#8c6c58]
            mb-6
          ">
            Our Services
          </p>

          <h2 className="
            font-serif
            text-[#231b1c]
            text-5xl
            md:text-6xl
          ">
            Thoughtfully curated experiences
          </h2>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* CARD 1 */}

          <div className="
            bg-white
            p-12
            border
            border-[#ece6e1]
            hover:-translate-y-3
            transition-all
            duration-500
          ">

            <Flower2
              size={34}
              className="text-[#c39b6e] mb-8"
              strokeWidth={1.5}
            />

            <h3 className="
              font-serif
              text-3xl
              text-[#231b1c]
              mb-6
            ">
              Burial / Funeral Arrangements
            </h3>

            <p className="
              text-[#6d6666]
              leading-[1.9]
            ">
              Elegant ceremony planning, venue coordination,
              floral styling, seating layouts, reception décor,
              and seamless logistical management.
            </p>

          </div>

          {/* CARD 2 */}

          <div className="
            bg-[#1d1e24]
            text-white
            p-12
            hover:-translate-y-3
            transition-all
            duration-500
          ">

            <HeartHandshake
              size={34}
              className="text-[#d6b177] mb-8"
              strokeWidth={1.5}
            />

            <h3 className="
              font-serif
              text-3xl
              mb-6
            ">
              Memorial Services
            </h3>

            <p className="
              text-[#c4c8cf]
              leading-[1.9]
            ">
              Meaningful remembrance experiences created
              with warmth, sensitivity, beautiful décor,
              personalized tributes, and organized coordination.
            </p>

          </div>

          {/* CARD 3 */}

          <div className="
            bg-white
            p-12
            border
            border-[#ece6e1]
            hover:-translate-y-3
            transition-all
            duration-500
          ">

            <Users
              size={34}
              className="text-[#c39b6e] mb-8"
              strokeWidth={1.5}
            />

            <h3 className="
              font-serif
              text-3xl
              text-[#231b1c]
              mb-6
            ">
              Private Gatherings
            </h3>

            <p className="
              text-[#6d6666]
              leading-[1.9]
            ">
              Intimate family gatherings, remembrance dinners,
              private ceremonies, and curated environments
              designed for connection and reflection.
            </p>

          </div>

        </div>

      </div>

      {/* FEATURE SECTION */}

      <div className="grid lg:grid-cols-2">

        <div className="relative h-[650px]">

          <Image
            src="/memo2.jpg"
            alt="Special Gatherings"
            fill
            className="object-cover"
          />

        </div>

        <div className="
          bg-[#ebe4dc]
          flex
          flex-col
          justify-center
          px-8
          lg:px-20
          py-20
        ">

          <p className="
            uppercase
            tracking-[3px]
            text-xs
            text-[#8c6c58]
            mb-6
          ">
            Compassionate Planning
          </p>

          <h2 className="
            font-serif
            text-[#231b1c]
            text-5xl
            leading-tight
            mb-10
          ">
            Supporting families with care and attention
          </h2>

          <p className="
            text-[#686060]
            leading-[2]
            text-lg
            max-w-[620px]
          ">
            At Gadiel Event Planners, we approach memorial
            and special gatherings with professionalism,
            empathy, and attention to detail — helping
            families create respectful experiences that
            beautifully honor cherished memories.
          </p>

        </div>

      </div>


      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-serif text-[#572649] mb-6">
            Let's Plan Your Next Corporate Event
          </h2>

          <p className="text-gray-600 text-lg mb-10">
            Whether it's a conference, retreat, product launch,
            or gala dinner, we'll create an experience that
            reflects your brand and goals.
          </p>

                              
<Link href="/book-consultation">
          <button
           
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
          </button>
          </Link>
        </div>
      </section>

    </section>
  );
}