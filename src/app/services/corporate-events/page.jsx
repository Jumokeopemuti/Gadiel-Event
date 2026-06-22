import SocialAdd from "@/components/SocialAdd";
import Image from "next/image";
import Link from "next/link";

import {
    MessageCircleMore,
    ClipboardList,
    Sparkles,
    CheckCircle2,
} from "lucide-react";

const services = [
    {
        title: "Conferences",
        description:
            "Professional planning and execution of conferences, seminars, and industry gatherings.",
        image: "/conf.jpg",
    },
    {
        title: "Company Retreats",
        description:
            "Team-building retreats designed to inspire collaboration and productivity.",
        image: "/retreat2.jpg",
    },
    {
        title: "Product Launches",
        description:
            "Create excitement around your brand with unforgettable launch experiences.",
        image: "/Stage.jpg",
    },
    {
        title: "Corporate Galas",
        description:
            "Elegant gala dinners and executive events tailored to your organization.",
        image: "/gala.jpg",
    },
    {
        title: "Networking Events",
        description:
            "Facilitating meaningful professional connections through engaging experiences.",
        image: "/retreat.jpg",
    },
    {
        title: "Award Ceremonies",
        description:
            "Celebrate achievements with professionally managed award presentations.",
        image: "/award.jpg",
    },
];

export default function CorporateEventsPage() {
    return (
        <main>
            {/* HERO */}
            <section className="relative h-[90vh] overflow-hidden">
                <Image
                    src="/cop2.jpg"
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
                            Corporate Events
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg text-gray-200">
                            From executive conferences to prestigious gala dinners,
                            Gadiel Events delivers exceptional corporate experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-5xl font-serif text-[#572649] mb-8">
                        Elevating Business Events
                    </h2>

                    <p className="text-lg text-gray-600 leading-8 max-w-4xl mx-auto">
                        We help organizations create impactful experiences that
                        strengthen brands, engage audiences, and foster meaningful
                        professional relationships.
                    </p>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500"
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition duration-700 group-hover:scale-110"
                                    />
                                </div>

                                <div className="p-8">
                                    <h3 className="text-2xl font-semibold text-[#572649] mb-4">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-600 leading-7">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <SocialAdd />

            {/* PROCESS */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-center text-5xl font-serif text-[#572649] mb-16">
                        Our Process
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Consultation",
                                icon: MessageCircleMore,
                                desc: "Understanding your vision, goals, and event expectations.",
                            },
                            {
                                title: "Planning",
                                icon: ClipboardList,
                                desc: "Strategic concept development with curated details.",
                            },
                            {
                                title: "Execution",
                                icon: Sparkles,
                                desc: "Flawless coordination and elegant event production.",
                            },
                            {
                                title: "Delivery",
                                icon: CheckCircle2,
                                desc: "Exceptional final experience crafted to perfection.",
                            },
                        ].map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.title}
                                    className="
          group
          relative
          bg-white
          border border-[#f0e8e2]
          rounded-[32px]
          p-8
          shadow-sm
          hover:shadow-2xl
          hover:-translate-y-3
          transition-all
          duration-500
          overflow-hidden
        "
                                >
                                    {/* Top Number */}
                                    <div className="absolute top-6 right-6 text-6xl font-serif text-[#f7ece7]">
                                        0{index + 1}
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className="
            w-16 h-16
            rounded-2xl
            bg-[#fdf4f8]
            flex items-center justify-center
            mb-8
            group-hover:bg-[#ca5bab]
            transition-all
            duration-500
          "
                                    >
                                        <Icon
                                            size={28}
                                            className="text-[#ca5bab] group-hover:text-white transition-colors duration-500"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-serif text-[#231b1c] mb-4">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[#6d6666] leading-[1.8] text-[15px]">
                                        {step.desc}
                                    </p>

                                    {/* Bottom Accent Line */}
                                    <div
                                        className="
            mt-8
            h-[2px]
            w-14
            bg-[#ca5bab]
            group-hover:w-full
            transition-all
            duration-500
          "
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

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
        </main>
    );
}