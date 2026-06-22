"use client";

import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SocialAdd() {

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);


    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && isPlaying) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            {
                threshold: 0.4,
            }
        );

        observer.observe(video);

        return () => observer.disconnect();
    }, [isPlaying]);





    const toggleVideo = () => {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };



    return (
        <section className="bg-[#f8f5f2] overflow-hidden">

            <div className="grid lg:grid-cols-12">

                {/* LEFT CONTENT AREA */}

                <div className="lg:col-span-8">

                    {/* TOP SECTION */}

                    <div className="px-8 lg:px-16 py-16 lg:py-20">

                        <p className="uppercase tracking-[3px] text-xs text-[#8b6c58] mb-6">
                            Creative Celebrations
                        </p>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">

                            <div>
                                <h2 className="
                  font-serif
                  text-[#231b1c]
                  text-5xl
                  md:text-7xl
                  leading-[0.95]
                ">
                                    Transform social moments into unforgettable experiences
                                </h2>
                            </div>

                            <div>

                                <p className="
                  text-[#666]
                  text-lg
                  leading-[2]
                  mb-10
                ">
                                    From birthdays and bridal showers to engagement parties,
                                    anniversaries, baby showers, and private celebrations —
                                    we create stylish, memorable events designed around your
                                    unique vision and personality.
                                </p>

                                <button className="
                  relative
                  text-[#231b1c]
                  font-medium
                  after:absolute
                  after:left-0
                  after:-bottom-2
                  after:h-[1px]
                  after:w-full
                  after:bg-[#231b1c]
                ">
                                    Explore Services
                                </button>

                            </div>

                        </div>
                    </div>

                    {/* BOTTOM GRID */}

                    <div className="grid md:grid-cols-2">

                        {/* IMAGE */}

                        <div className="relative h-[340px] lg:h-[680px] overflow-hidden">

                            <Image
                                src="/show5.jpg"
                                alt="Luxury Social Event"
                                fill
                                className="
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                  h-[680px]
                "
                            />

                        </div>

                        {/* DARK CONTENT PANEL */}

                        <div className="
              bg-[#14161d]
              text-white
              p-10
              lg:p-14
              flex
              flex-col
              justify-center
            ">

                            <div className="mb-12">

                                <h3 className="
                  font-serif
                  text-3xl
                  mb-5
                ">
                                    Birthday Experiences
                                </h3>

                                <p className="
                  text-[#b8bcc6]
                  leading-[1.9]
                ">
                                    Luxury themed birthdays, intimate dinners,
                                    milestone celebrations, and bespoke party styling.
                                </p>

                            </div>

                            <div>

                                <h3 className="
                  font-serif
                  text-3xl
                  mb-5
                ">
                                    Bridal & Baby Showers
                                </h3>

                                <p className="
                  text-[#b8bcc6]
                  leading-[1.9]
                ">
                                    Beautiful décor concepts, curated tablescapes,
                                    personalized experiences, and elegant celebration styling.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT FEATURE PANEL */}

                <div className="lg:col-span-4 relative h-[850px] lg:h-auto overflow-hidden">

                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    >
                        <source src="/video1.mp4" type="video/mp4" />
                    </video>


                    <div className="
            absolute inset-0
            bg-black/15
          " />

                    {/* PLAY BUTTON */}

                    <div className="
            absolute inset-0
            flex items-center justify-center
          ">

                        <button
                            onClick={toggleVideo}
                            className="
        w-24 h-24
        rounded-full
        bg-white/90
        backdrop-blur-md
        flex items-center justify-center
        hover:scale-110
        transition-all
        duration-500
    "
                        >
                            {isPlaying ? (
                                <Pause size={34} fill="#111" />
                            ) : (
                                <Play size={34} fill="#111" className="ml-1" />
                            )}
                        </button>

                    </div>

                </div>

            </div>
        </section>
    );
}