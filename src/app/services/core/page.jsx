import EventCollection from "@/components/EventCollection";
import {
    CalendarDays,
    Settings,
    ClipboardCheck,
    Sparkles,
    Users,
    Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
    {
        title: "Event Planning Services",
        icon: CalendarDays,
        desc: "From concept creation to flawless execution, we craft exceptional events tailored to your vision with precision and creativity.",
    },
    {
        title: "Event Management & Production",
        icon: Settings,
        desc: "We oversee every operational detail, ensuring seamless coordination, technical excellence, and smooth event execution.",
    },
    {
        title: "Event Coordination",
        icon: ClipboardCheck,
        desc: "Our team manages timelines, schedules, and event flow to guarantee a stress-free and perfectly organized experience.",
    },
    {
        title: "Venue Styling & Decoration",
        icon: Sparkles,
        desc: "Transforming spaces into elegant, unforgettable settings through luxury décor, styling, and aesthetic refinement.",
    },
    {
        title: "Guest Experience Management",
        icon: Users,
        desc: "We design thoughtful guest journeys that create comfort, engagement, and memorable experiences from arrival to departure.",
    },
    {
        title: "Logistics & Vendor Coordination",
        icon: Truck,
        desc: "From vendor sourcing to operational logistics, we ensure every moving part aligns flawlessly for a polished event.",
    },
];

export default function CoreServicesPage() {
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
                            Professional Excellence
                        </p>

                        <h1 className="text-6xl md:text-8xl font-serif mb-6">
                            Core Services
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg text-gray-200">
                            Delivering exceptional event experiences through strategic planning,
                            creative styling, and flawless execution tailored to your unique vision.
                        </p>
                    </div>
                </div>


            </div>


            {/* SERVICES GRID */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={index}
                                className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-[#f1e8eb] group"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#f8edf1] flex items-center justify-center mb-8 group-hover:bg-[#e4adc0] transition">
                                    <Icon className="text-[#181629] w-7 h-7" />
                                </div>

                                <h3 className="text-2xl font-serif text-[#181629] mb-5">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 leading-8">
                                    {service.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <EventCollection />

            {/* CTA */}
            <section className="bg-[#f3e8ec] py-24 text-center px-6">
                <h2 className="text-4xl md:text-5xl font-serif text-[#181629] mb-6">
                    Let’s Create Something Extraordinary
                </h2>

                <p className="max-w-2xl mx-auto text-gray-700 leading-8 mb-10">
                    Whether you're planning an intimate celebration or a large-scale event,
                    our team ensures every detail is executed with elegance and precision.
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