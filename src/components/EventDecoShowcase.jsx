"use client";

import Image from "next/image";
import { Sparkles, Flower2, PartyPopper } from "lucide-react";

export default function EventDecoShowcase() {
    return (
        <section className="bg-[#f5f1ee] py-24 overflow-hidden">

            <div className="max-w-[1400px] mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    

                    {/* RIGHT SIDE */}

                    <div className="pt-6">

                        <p className="uppercase tracking-[3px] text-xs text-[#6f5858] mb-6">
                            What Defines Us
                        </p>

                        <h2 className="
              font-serif
              text-[#231b1c]
              text-5xl
              lg:text-7xl
              leading-[0.95]
              mb-10
            ">
                            Crafting luxury event memories
                        </h2>

                        <p className="text-[#706868] text-lg leading-[1.9] mb-14 max-w-[620px]">
                            Gadiel Event Planners is a premium event planning and décor
                            company in Lekki, Lagos, Nigeria, specializing in bespoke
                            weddings, corporate events, birthdays, social celebrations,
                            experiential events, and unforgettable luxury experiences.
                        </p>

                        {/* FEATURES */}

                        <div className="space-y-12">

                            <div className="flex gap-5">

                                <Flower2
                                    className="text-[#973f72] shrink-0 mt-1"
                                    size={22}
                                    strokeWidth={1.5}
                                />

                                <div>
                                    <h3 className="font-serif text-3xl text-[#231b1c] mb-3">
                                        Bespoke Event Styling
                                    </h3>

                                    <p className="text-[#706868] leading-[1.9]">
                                        Elegant décor concepts, floral styling, luxury tablescapes,
                                        and curated visual experiences tailored to your celebration.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-5">

                                <PartyPopper
                                    className="text-[#973f72] shrink-0 mt-1"
                                    size={22}
                                    strokeWidth={1.5}
                                />

                                <div>
                                    <h3 className="font-serif text-3xl text-[#231b1c] mb-3">
                                        Social & Corporate Events
                                    </h3>

                                    <p className="text-[#706868] leading-[1.9]">
                                        From weddings and birthdays to conferences, seminars,
                                        launches, and team bonding experiences.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-5">

                                <Sparkles
                                    className="text-[#973f72] shrink-0 mt-1"
                                    size={22}
                                    strokeWidth={1.5}
                                />

                                <div>
                                    <h3 className="font-serif text-3xl text-[#231b1c] mb-3">
                                        Memorable Guest Experiences
                                    </h3>

                                    <p className="text-[#706868] leading-[1.9]">
                                        Every event is approached with creativity, detail, and
                                        precision to deliver unforgettable experiences that exceed
                                        expectations.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* LEFT SIDE */}

                    <div>

                        <div className="grid grid-cols-2 gap-5">

                            {/* GOLD TEXT CARD */}

                            <div className="bg-[#973f72] p-10 flex flex-col justify-between min-h-[420px]">

                                <p className="uppercase tracking-[3px] text-xs text-white">
                                    EVENT EXPERIENCE
                                </p>

                                <h3 className="font-serif text-white text-4xl leading-[1.05]">
                                    Creating timeless celebrations and unforgettable moments
                                </h3>
                            </div>

                            {/* TOP IMAGE */}

                            <div className="relative min-h-[420px] overflow-hidden">

                                <Image
                                    src="/show10.webp"
                                    alt="Luxury Event Styling"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* LARGE BOTTOM IMAGE */}

                        <div className="relative mt-5 h-[320px] overflow-hidden">

                            <Image
                                src="/show11.webp"
                                alt="Luxury Event Decor"
                                fill
                                className="object-cover"
                            />
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}