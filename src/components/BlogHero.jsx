"use client";

import { ChevronDown, Search, ArrowRight } from "lucide-react";

export default function BlogHero() {
    return (
        <section className="bg-[#f7f4f1] py-32 text-center">


            {/* HERO */}
            <div className="text-center  ">
                <p className="uppercase tracking-[6px] text-sm text-[#ca5bab] mb-5">
                    Luxury Event Journal
                </p>

                <h1 className="font-serif text-[#231b1c] text-5xl md:text-7xl mb-8">
                    Blog Standard
                </h1>

                <ChevronDown className="mx-auto text-[#231b1c]" size={28} />
            </div>

           

        </section>
    );
}