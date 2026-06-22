import SocialEventsSection from "@/components/SocialEventsSection";
import {
    Heart,
    Cake,
    Sparkles,
    Baby,
    Flower2,
    Gift,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialEvents = [
    {
        title: "Weddings",
        icon: Heart,
        desc: "Elegant wedding planning and coordination crafted to reflect your love story with timeless sophistication and flawless execution.",
    },
    {
        title: "Birthday Celebrations",
        icon: Cake,
        desc: "Luxury birthday experiences designed to create unforgettable memories through stunning décor, entertainment, and personalized details.",
    },
    {
        title: "Proposals",
        icon: Sparkles,
        desc: "Romantic proposal experiences thoughtfully curated to create intimate, magical, and unforgettable moments.",
    },
    {
        title: "Baby Showers",
        icon: Baby,
        desc: "Beautifully styled baby shower celebrations designed to honor new beginnings with warmth, elegance, and creativity.",
    },
    {
        title: "Bridal Showers",
        icon: Flower2,
        desc: "Sophisticated bridal shower experiences tailored to celebrate love, friendship, and joyful anticipation.",
    },
    {
        title: "Anniversary Celebrations",
        icon: Gift,
        desc: "Meaningful anniversary events designed to celebrate milestones with elegance, romance, and unforgettable experiences.",
    },
];

export default function SocialEventsPage() {
    return (
        <main className="bg-[#faf7f5] min-h-screen">



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
                            Personal Celebrations
                        </p>

                        <h1 className="text-6xl md:text-8xl font-serif mb-6">
                            Social Events
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg text-gray-200">
                            We transform life’s most cherished moments into beautifully curated
                            experiences filled with elegance, joy, and unforgettable memories.
                        </p>
                    </div>
                </div>


            </div>


            {/* EVENTS GRID */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {socialEvents.map((event, index) => {
                        const Icon = event.icon;

                        return (
                            <div
                                key={index}
                                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-[#f3e8ec] group"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#fdf1f5] flex items-center justify-center mb-8 group-hover:bg-[#f1c9d7] transition">
                                    <Icon className="text-[#572649] w-7 h-7" />
                                </div>

                                <h3 className="text-2xl font-serif text-[#181629] mb-5">
                                    {event.title}
                                </h3>

                                <p className="text-gray-600 leading-8">
                                    {event.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6">
                <SocialEventsSection />
            </section>



            {/* FEATURE SECTION */}
            <section className="bg-[#f9f1f5] py-24 px-6">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <p className="uppercase tracking-[4px] text-[#572649] mb-4">
                            Crafted With Love
                        </p>

                        <h2 className="text-5xl font-serif text-[#181629] mb-8">
                            Celebrating Life’s Most Beautiful Moments
                        </h2>

                        <p className="text-gray-700 leading-8 mb-6">
                            Every social celebration deserves thoughtful planning, refined
                            styling, and seamless coordination.
                        </p>

                        <p className="text-gray-700 leading-8">
                            From intimate proposals to grand wedding celebrations, we bring
                            creativity, elegance, and precision to every detail.
                        </p>
                    </div>

                    <div className="relative h-[500px] rounded-3xl overflow-hidden">
                        <img
                            src="/birth1.jpg"
                            alt="Social Events"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center px-6">
                <h2 className="text-4xl md:text-5xl font-serif text-[#181629] mb-6">
                    Let’s Celebrate Your Special Moment
                </h2>

                <p className="max-w-2xl mx-auto text-gray-700 leading-8 mb-10">
                    Whether it’s an intimate gathering or a grand celebration, we create
                    unforgettable social events with elegance and precision.
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
            </section>
        </main>
    );
}