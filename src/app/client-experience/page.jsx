"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react";

export default function ClientExperiencePage() {

  const standards = [
    {
      icon: Clock3,
      title: "Rapid Response",
      text:
        "We value your time and prioritize fast, clear, and professional communication from inquiry to execution.",
    },

    {
      icon: MessageCircle,
      title: "Personalized Attention",
      text:
        "Every client receives tailored planning support designed around their goals, expectations, and event vision.",
    },

    {
      icon: ShieldCheck,
      title: "Transparent Communication",
      text:
        "Clear updates, organized timelines, honest conversations, and dependable planning guidance throughout.",
    },

    {
      icon: Sparkles,
      title: "Luxury Service Delivery",
      text:
        "Professional coordination, exceptional attention to detail, and a seamless premium client experience.",
    },
  ];

  return (

    <main className="bg-[#f8f5f1]">

      {/* HERO */}

      <section className="
        relative
        h-[90vh]
        overflow-hidden
      ">

        <Image
          src="/show7.jpg"
          alt="client experience"
          fill
          priority
          className="object-cover"
        />

        <div className="
          absolute inset-0
          bg-black/60
        "/>

        <div className="
          absolute inset-0
          flex
          items-center
          justify-center
          text-center
          px-6
        ">

          <div className="max-w-5xl">

            <p className="
              uppercase
              tracking-[5px]
              text-white/70
              text-xs
              mb-8
            ">
              The Gadiel Experience
            </p>

            <h1 className="
              font-serif
              text-white
              text-5xl
              md:text-8xl
              leading-tight
              mb-10
            ">
              Service Beyond Expectations
            </h1>

            <p className="
              text-white/90
              text-lg
              md:text-2xl
              leading-10
            ">
              Exceptional events begin with exceptional care.
              We pride ourselves on responsiveness,
              professionalism, transparency, and delivering
              an unforgettable planning experience.
            </p>

          </div>

        </div>

      </section>

      {/* INTRO */}

      <section className="py-28">

        <div className="
          max-w-[1400px]
          mx-auto
          px-6
        ">

          <div className="
            grid
            lg:grid-cols-2
            gap-20
            items-center
          ">

            <div>

              <p className="
                uppercase
                tracking-[4px]
                text-[#572649]
                text-xs
                mb-6
              ">
                Our Customer Commitment
              </p>

              <h2 className="
                font-serif
                text-5xl
                md:text-7xl
                leading-tight
                text-[#232323]
                mb-10
              ">
                We Don’t Just Plan Events —
                We Build Trust.
              </h2>

            </div>

            <div>

              <p className="
                text-[#555]
                text-lg
                leading-10
                mb-8
              ">
                At Gadiel Event, we believe exceptional
                planning begins long before event day.
              </p>

              <p className="
                text-[#555]
                text-lg
                leading-10
              ">
                From your very first inquiry, our team is
                committed to ensuring you feel heard,
                supported, informed, and confidently guided
                throughout every stage of your planning journey.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* SERVICE STANDARDS */}

      <section className="pb-28">

        <div className="
          max-w-[1450px]
          mx-auto
          px-6
        ">

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          ">

            {standards.map((item,index)=>{

              const Icon = item.icon;

              return(

                <div
                  key={index}
                  className="
                    bg-white
                    p-10
                    hover:-translate-y-3
                    transition-all
                    duration-500
                    shadow-sm
                  "
                >

                  <Icon
                    size={45}
                    className="
                      text-[#572649]
                      mb-8
                    "
                  />

                  <h3 className="
                    font-serif
                    text-3xl
                    text-[#232323]
                    mb-6
                  ">
                    {item.title}
                  </h3>

                  <p className="
                    text-[#666]
                    leading-9
                  ">
                    {item.text}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>

      {/* PROCESS */}

      <section className="
        bg-[#231b1c]
        py-28
        text-white
      ">

        <div className="
          max-w-[1300px]
          mx-auto
          px-6
        ">

          <div className="text-center mb-20">

            <p className="
              uppercase
              tracking-[4px]
              text-xs
              text-[#d4af37]
              mb-6
            ">
              Our Process
            </p>

            <h2 className="
              font-serif
              text-5xl
              md:text-7xl
            ">
              How We Care For Our Clients
            </h2>

          </div>

          <div className="
            grid
            lg:grid-cols-4
            gap-10
          ">

            {[
              "Initial Consultation",
              "Strategic Planning",
              "Ongoing Communication",
              "Flawless Execution"
            ].map((item,index)=>(

              <div key={index}>

                <span className="
                  text-[#d4af37]
                  text-5xl
                  font-serif
                  block
                  mb-6
                ">
                  0{index+1}
                </span>

                <h3 className="
                  text-2xl
                  font-serif
                  mb-5
                ">
                  {item}
                </h3>

                <p className="
                  text-white/70
                  leading-9
                ">
                  Thoughtful planning,
                  proactive communication,
                  and premium client support.
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="py-28">

        <div className="
          max-w-[1350px]
          mx-auto
          px-6
        ">

          <div className="
            grid
            lg:grid-cols-3
            gap-10
          ">

            {[
              "The communication was exceptional from beginning to end.",
              "Professional, responsive, organized and incredibly caring.",
              "Every concern was addressed quickly and professionally."
            ].map((quote,index)=>(

              <div
                key={index}
                className="
                  bg-white
                  p-10
                  shadow-sm
                "
              >

                <Star
                  className="
                    text-[#d4af37]
                    mb-6
                  "
                />

                <p className="
                  text-2xl
                  font-serif
                  text-[#232323]
                  leading-10
                  mb-10
                ">
                  "{quote}"
                </p>

                <span className="
                  text-[#777]
                  uppercase
                  tracking-[3px]
                  text-xs
                ">
                  Happy Client
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="
        bg-[#572649]
        py-24
        text-white
      ">

        <div className="
          max-w-[1400px]
          mx-auto
          px-6
        ">

          <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-12
            text-center
          ">

            {[
              ["95%","Client Satisfaction"],
              ["24hrs","Response Commitment"],
              ["100+","Events Delivered"],
              ["Premium","Client Experience"]
            ].map((item,index)=>(

              <div key={index}>

                <h3 className="
                  font-serif
                  text-6xl
                  mb-4
                ">
                  {item[0]}
                </h3>

                <p className="
                  uppercase
                  tracking-[3px]
                  text-sm
                ">
                  {item[1]}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-28">

        <div className="
          max-w-[1200px]
          mx-auto
          px-6
          text-center
        ">

          <h2 className="
            font-serif
            text-5xl
            md:text-7xl
            text-[#232323]
            mb-10
          ">
            Ready To Experience
            Exceptional Service?
          </h2>

          <p className="
            text-[#666]
            text-lg
            leading-9
            max-w-3xl
            mx-auto
            mb-12
          ">
            Discover how effortless, responsive,
            and premium event planning should feel.
          </p>

          <Link
            href="/book-consultation"
            className="
              inline-flex
              items-center
              gap-4

              bg-[#231b1c]
              text-white

              px-10
              py-5

              uppercase
              tracking-[3px]
              text-sm

              hover:bg-[#572649]
              transition-all
            "
          >

            Book A Consultation

            <ArrowRight size={18}/>

          </Link>

        </div>

      </section>

    </main>

  );
}