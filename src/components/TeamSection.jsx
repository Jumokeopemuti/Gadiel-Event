"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion} from "framer-motion";

export default function TeamSection() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const res = await fetch("/api/staff");
      const data = await res.json();
      setTeam(data);
    };

    fetchStaff();
  }, []);

  return (
    <section className="bg-[#f8f4f1] py-32">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-24">
          <p className="uppercase tracking-[0.4em] text-[12px] text-[#8a6a72] mb-4">
            Our Professionals
          </p>

          <h2 className="font-serif text-[#1d1718] text-5xl md:text-7xl leading-[0.95]">
            Meet the experts
            <br />
            behind every celebration
          </h2>

          <div className="w-24 h-[1px] bg-[#bfa5ac] mx-auto mt-8" />

          <p className="mt-8 max-w-2xl mx-auto text-[#5b4f50] text-lg leading-[1.9]">
            Our experienced professionals combine creativity, precision,
            and dedication to craft extraordinary events that leave
            lasting impressions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
          {team.map((member) => (
            <motion.div
              key={member._id}
              whileHover={{ y: -12 }}
              className="group"
            >
              <div className="bg-white overflow-hidden shadow-xl">

                <div className="relative h-[520px] overflow-hidden">
                  <Image
                    src={member.image || "/default.jpg"}
                    alt={member.fullName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8">
                  <p className="uppercase text-[11px] text-[#8a6a72]">
                    {member.role}
                  </p>

                  <h3 className="font-serif text-3xl">
                    {member.fullName}
                  </h3>

                  <p className="text-[#5b4f50] mt-4">
                    {member.bio}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="text-center mt-24">
          <p className="font-serif text-3xl md:text-4xl text-[#1d1718] max-w-4xl mx-auto leading-[1.4]">
            A dedicated team committed to transforming your vision into
            timeless, unforgettable experiences.
          </p>
        </div>
      </div>
    </section>
  );
}

