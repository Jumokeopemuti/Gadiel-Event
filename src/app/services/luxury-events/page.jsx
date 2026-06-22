"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import StorySection from "@/components/StorySection";

export default function LuxuryEventsSection() {
    const router = useRouter();

    return (
        <section className="bg-[#fdfaf7] overflow-hidden">


            {/* HERO */}
            <div className="relative h-[90vh] mb-12 overflow-hidden">
                <Image
                    src="/show2.jpg"
                    alt="Corporate Events"
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-6">
                        <p className="uppercase tracking-[8px] mb-4">
                            Experiential & Luxury Events
                        </p>

                        <h1 className="text-6xl md:text-8xl font-serif mb-6">
                            Luxury Lifestyle Events
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg text-gray-200">
                            From exclusive private soirées to custom-themed luxury experiences,
                            we transform ideas into extraordinary realities. Every celebration is
                            carefully curated with elegance, creativity, and precision to create
                            moments that are both timeless and unforgettable.
                        </p>
                    </div>
                </div>


            </div>


            <div className="max-w-7xl mx-auto px-6 lg:px-16">

                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* IMAGE SIDE */}
                    <div className="relative h-[750px] rounded-[30px] overflow-hidden order-2 lg:order-1">
                        <Image
                            src="/show6.jpg"
                            alt="Luxury Event Experience"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-black/25" />

                        <div className="absolute bottom-12 left-10 text-white">
                            <p className="uppercase tracking-[4px] text-sm mb-4">
                                Bespoke Experiences
                            </p>

                            <h3 className="font-serif text-4xl max-w-md leading-tight">
                                Extraordinary events crafted beyond expectation
                            </h3>
                        </div>
                    </div>

                    {/* CONTENT SIDE */}
                    <div className="order-1 lg:order-2">
                        <p className="uppercase tracking-[4px] text-sm text-[#8b6c58] mb-6">
                            Experiential & Luxury Events
                        </p>

                        <h2 className="font-serif text-[#231b1c] text-5xl md:text-7xl leading-[1.05] mb-8">
                            Immersive celebrations designed for unforgettable impact
                        </h2>

                        <p className="text-[#666] text-lg leading-[2] mb-10">
                            We create exceptional luxury experiences that captivate,
                            inspire, and leave lasting impressions. From intimate VIP
                            gatherings to fully customized themed productions, every
                            event is tailored with precision, elegance, and innovation.
                        </p>

                        {/* SERVICES LIST */}
                        <div className="space-y-5 mb-12 text-[#231b1c]">
                            {[
                                "Experiential Events",
                                "VIP Private Events",
                                "Luxury Lifestyle Events",
                                "Custom-Themed Experiences",
                            ].map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-4 border-b border-[#e6ddd8] pb-4"
                                >
                                    <span className="text-[#8b6c58] text-sm">
                                        0{index + 1}
                                    </span>
                                    <p className="text-xl font-medium">{item}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() =>
                                router.push("/services/experiential-luxury-events")
                            }
                            className="
                flex items-center gap-3
                text-[#231b1c]
                font-medium
                hover:text-[#572649]
                transition-colors
              "
                        >
                            Explore Experiences
                            <ArrowRight size={18} />
                        </button>
                    </div>

                </div>
            </div>


            <StorySection />


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