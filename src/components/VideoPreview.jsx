"use client";

import { FaPlay } from "react-icons/fa";
import { useState } from "react";

export default function VideoPreview() {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <section className="relative py-24 bg-[#f7f3ef] overflow-hidden">

            {/* Dark Background Block */}
            <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-[#050814]" />

            <div className="relative max-w-7xl mx-auto px-6">

                {/* VIDEO PREVIEW */}
                <div className="relative overflow-hidden shadow-2xl">

                    {/* Thumbnail */}
                    <img
                        src="/video-thumbnail.png"
                        alt="Event Preview"
                        className="w-full h-[350px] md:h-[650px] object-cover"
                    />

                    {/* Play Button */}
                    <button
                        onClick={() => setShowVideo(true)}
                        className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-24
              h-24
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              shadow-xl
              hover:scale-110
              transition
            "
                    >
                        <FaPlay className="text-[#572649] text-2xl ml-1" />
                    </button>

                </div>

            </div>

            {/* VIDEO MODAL */}
            {showVideo && (
                <div
                    className="
            fixed
            inset-0
            bg-black/80
            z-[99999]
            flex
            items-center
            justify-center
            p-6
          "
                >
                    <div className="relative w-full max-w-5xl">

                        {/* Close */}
                        <button
                            onClick={() => setShowVideo(false)}
                            className="
                absolute
                -top-12
                right-0
                text-white
                text-4xl
              "
                        >
                            ×
                        </button>

                        <div className="aspect-video">
                            <video
                                className="w-full h-full"
                                controls
                                autoPlay
                                muted
                                controlsList="nodownload"
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                <source src="/video3.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}

            {/* Decorative Shapes */}
            <div className="absolute left-0 bottom-10 opacity-10">
                <img
                    src="/flower-decoration.png"
                    alt=""
                    className="w-64"
                />
            </div>

            <div className="absolute right-0 bottom-0 opacity-10">
                <img
                    src="/flower-decoration-2.png"
                    alt=""
                    className="w-96"
                />
            </div>

        </section>
    );
}