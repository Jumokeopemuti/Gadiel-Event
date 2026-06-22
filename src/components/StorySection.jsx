"use client";

import Image from "next/image";

export default function StorySection() {
    return (
        <section className="bg-[#f7f4f1] overflow-hidden py-24">
            <div className="max-w-[1600px] mx-auto px-6">

                <div className="grid lg:grid-cols-3 gap-12 items-center">

                    {/* LEFT IMAGE */}
                    <div className="relative h-[720px] overflow-hidden">
                        <Image
                            src="/show6.jpg"
                            alt="Luxury Event"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* CENTER TEXT */}
                    <div className="flex flex-col justify-center px-6">

                        <p className="
                            uppercase
                            tracking-[4px]
                            text-xs
                            text-[#7c6557]
                            mb-8
                        ">
                            EXPERIENTIAL LUXURY
                        </p>

                        <h2 className="
                            font-serif
                            text-[#231b1c]
                            text-5xl
                            md:text-6xl
                            leading-[1]
                            mb-10
                        ">
                            Bespoke experiences crafted for extraordinary moments
                        </h2>

                        <p className="
                            text-[#6d6666]
                            text-lg
                            leading-[2]
                            mb-10
                        ">
                            From exclusive private gatherings to immersive
                            custom-themed productions, we design refined
                            luxury experiences that captivate, inspire,
                            and leave unforgettable impressions.
                        </p>

                        <p className="
                            text-[#6d6666]
                            text-lg
                            leading-[2]
                        ">
                            Every detail is intentionally curated to deliver
                            elegance, exclusivity, and exceptional storytelling
                            tailored to your vision.
                        </p>

                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative h-[720px] overflow-hidden">
                        <Image
                            src="/show5.jpg"
                            alt="VIP Luxury Experience"
                            fill
                            className="
                                object-cover
                                transition-transform
                                duration-700
                                hover:scale-105
                            "
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}