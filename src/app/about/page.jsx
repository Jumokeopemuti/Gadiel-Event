"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import EventDecoShowcase from "@/components/EventDecoShowcase";
import TeamSection from "@/components/TeamSection";
import Link from "next/link";

export default function AboutHeader() {
    return (
        <section className="bg-[#f8f4f1] overflow-hidden">
            <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-24 lg:py-32">

                {/* Hero Header */}
                <div className="text-center mb-28">
                    <p className="uppercase tracking-[0.45em] text-[12px] text-[#7a5b63] mb-5">
                        About Gadiel
                    </p>

                    <h1 className="font-serif text-[#1d1718] text-5xl md:text-7xl lg:text-[92px] font-light tracking-[-0.04em] leading-[0.95]">
                        Crafting timeless
                        <br />
                        celebrations
                    </h1>

                    <div className="mt-8 flex justify-center">
                        <div className="w-20 h-[1px] bg-[#8b6f76]" />
                    </div>

                    <ChevronDown
                        className="mx-auto mt-8 text-[#3d2f33]"
                        size={26}
                        strokeWidth={1}
                    />
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-12 gap-16 items-center">

                    {/* Left */}
                    <div className="lg:col-span-5 -mt-34">

                        <p className="uppercase tracking-[0.35em] text-[12px] text-[#7a5b63] mb-8">
                            WHO WE ARE
                        </p>

                        <h2 className="font-serif text-[#231b1c] text-4xl md:text-6xl leading-[1] tracking-[-0.03em] max-w-[560px]">
                            Creating unforgettable experiences with elegance and precision
                        </h2>

                        <div className="w-24 h-[1px] bg-[#8b6f76] my-10" />

                        <div className="space-y-7 text-[#4f4444] text-lg leading-[1.9] max-w-[600px]">
                            <p>
                                Gadiel Event Planners is a premium event planning company
                                based in Lekki, Lagos, specializing in sophisticated social
                                and corporate celebrations.
                            </p>

                            <p>
                                From luxury weddings and milestone celebrations to executive
                                conferences and bespoke corporate experiences, we deliver
                                exceptional moments tailored to each client’s vision.
                            </p>

                            <p>
                                Our process blends creativity, strategic planning, and
                                meticulous execution to create immersive experiences that
                                feel seamless, memorable, and truly extraordinary.
                            </p>

                            <p>
                                Every event is thoughtfully designed to reflect elegance,
                                excellence, and timeless sophistication.
                            </p>
                        </div>

                        {/* Floating Card */}
                        <div className="relative mt-20 ml-10 lg:ml-24">
                            <div className="relative w-[280px] h-[360px] lg:w-full lg:h-[200px] overflow-hidden shadow-2xl">
                                <Image
                                    src="/show6.jpg"
                                    alt="Celebration"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="absolute -bottom-8 -left-8 bg-white px-8 py-6 shadow-xl">
                                <p className="text-sm uppercase tracking-[0.35em] text-[#7a5b63]">
                                    Since 2018
                                </p>
                                <h3 className="font-serif text-2xl mt-2">
                                    Excellence in every detail
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-70 right-40">
                        <Image
                            src="/bac1.png"
                            alt="Luxury Event"
                            width={900}
                            height={1000}
                            className="object-cover opacity-10 z-0 w-full h-[750px]"
                        />
                    </div>





                    {/* Right */}
                    <div className="lg:col-span-7 relative">



                        {/* Decorative Block */}
                        <div className="absolute top-50 -left-10 w-48 h-48 border border-[#d7c7cb]" />

                        <div className="relative overflow-hidden shadow-2xl">
                            <Image
                                src="/show7.jpg"
                                alt="Luxury Event"
                                width={900}
                                height={1000}
                                className="object-cover w-full h-[750px]"
                            />
                        </div>

                        {/* Overlay Text */}
                        <div className="absolute bottom-12 left-12 bg-white/95 backdrop-blur-sm px-10 py-8 max-w-md shadow-xl">
                            <p className="uppercase tracking-[0.35em] text-[11px] text-[#7a5b63] mb-3">
                                Our Promise
                            </p>

                            <h3 className="font-serif text-3xl text-[#231b1c] leading-tight">
                                Transforming ideas into unforgettable realities
                            </h3>
                        </div>
                    </div>
                </div>
            </div>


            <EventDecoShowcase />
            <div className="relative w-full h-[40rem] overflow-hidden">

                {/* Background Image */}
                <Image
                    src="/show12.webp"
                    alt="Luxury Event"
                    fill
                    className="object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/25" />

                {/* Content Overlay */}
                <div className="
    absolute inset-0
    flex items-center
    px-8 md:px-20 lg:px-32
  ">
                    <div className="max-w-2xl text-white">

                        <p className="
        uppercase
        tracking-[4px]
        text-sm
        mb-6
        text-[#f3e6dc]
      ">
                            EXPERIENTIAL LUXURY
                        </p>

                        <h1 className="
        font-serif
        text-5xl
        md:text-7xl
        leading-[1.05]
        mb-8
      ">
                            Curating unforgettable luxury event experiences
                        </h1>

                        <p className="
        text-lg
        md:text-xl
        leading-[1.8]
        text-white/90
        max-w-xl
        mb-10
      ">
                            Bespoke experiential events designed with elegance,
                            exclusivity, and immersive storytelling.
                        </p>

                        <Link href="/services/core">

                        <button className="
        bg-[#d6a073]
        hover:bg-[#c58c5c]
        px-10 py-5
        text-lg
        font-medium
        transition-all
      ">
                            Explore Experiences
                        </button>

                        </Link>

                    </div>
                </div>

            </div>

            <TeamSection />


        </section>
    );
}