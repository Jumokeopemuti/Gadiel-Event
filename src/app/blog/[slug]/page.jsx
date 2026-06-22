import Image from "next/image";
import Link from "next/link";
import Comments from "@/components/Comments";
import { notFound } from "next/navigation";
import {
    Calendar,
    Search,

} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter
} from "react-icons/fa6";

import { getAllBlogPosts } from "@/lib/getAllBlogPosts";


export default async function BlogPost({ params }) {
     const { slug } = await params;

    const allPosts = await getAllBlogPosts();

    const post = allPosts.find(
  (p) => (p.slug || p._id?.toString()) === slug
);

    if (!post) return notFound();

    const recentPosts = allPosts
        .filter((item) => item.slug !== slug)
        .slice(0, 4);
    return (

        <main className="bg-[#f8f5f1]">

            {/* HERO */}

            <section className="relative h-[95vh]   overflow-visible">

                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/45" />

                {/* FLOATING CARD */}

                <div className="
          absolute
          bottom-[-80px]
          left-1/2
          -translate-x-1/2
          w-full
          max-w-5xl
          px-6
        ">

                    <div className="
            bg-[#f8f5f1]
            p-10
            
          ">

                        <p className="
              uppercase
              tracking-[4px]
              text-xs
              text-[#572649]
              mb-5
            ">
                            {post.category}
                        </p>

                        <h1 className="
              font-serif
              text-4xl
              md:text-7xl
              leading-tight
              text-[#232323]
              
            ">
                            {post.title}
                        </h1>

                        <div className="
              flex
              items-center
              gap-3
              text-[#777]
            ">
                            <Calendar size={18} />
                            {post.date}
                        </div>

                    </div>

                </div>

            </section>

            {/* CONTENT */}

            <section className="pt-40 pb-24">

                <div className="
          max-w-[1450px]
          mx-auto
          px-6
        ">

                    <div className="
            grid
            lg:grid-cols-[2fr_420px]
            gap-20
          ">

                        {/* ARTICLE */}

                        <article>

                            {/* DROP CAP INTRO */}

                            <div className="mb-16">

                                {post.introduction?.map(
                                    (paragraph, index) => (
                                        <p
                                            key={index}
                                            className="
                        text-xl
                        leading-[2.2]
                        text-[#444]
                        mb-8
                        ml-4
                      "
                                        >

                                            {index === 0 && (

                                                <span className="
                          float-left
                          text-7xl
                          leading-none
                          mr-4
                          font-serif
                          text-[#572649]
                        ">
                                                    {paragraph.charAt(0)}
                                                </span>

                                            )}

                                            {index === 0
                                                ? paragraph.slice(1)
                                                : paragraph}

                                        </p>
                                    )
                                )}

                            </div>

                            {/* INLINE IMAGE */}

                            <div className="
                relative
                h-[550px]
                mb-20
                overflow-hidden
              ">

                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                            {/* SECTIONS */}

                            <div className="space-y-20">

                                {post.sections?.map(
                                    (section, index) => (

                                        <div key={index}>

                                            <h2 className="
                        font-serif
                        text-4xl
                        md:text-5xl
                        mb-8
                        text-[#232323]
                      ">
                                                {section.heading}
                                            </h2>

                                            {section.content.map(
                                                (paragraph, i) => (

                                                    <p
                                                        key={i}
                                                        className="
                              text-lg
                              leading-[2.1]
                              text-[#444]
                              mb-8
                            "
                                                    >
                                                        {paragraph}
                                                    </p>

                                                )
                                            )}

                                        </div>

                                    )
                                )}

                            </div>

                            {/* QUOTE */}

                            <div className="
                my-24
                border-l-4
                border-[#572649]
                pl-10
              ">

                                <p className="
                  font-serif
                  italic
                  text-3xl
                  leading-relaxed
                  text-[#232323]
                ">
                                    Exceptional events are not
                                    remembered for perfection
                                    alone — they are remembered
                                    for emotion, atmosphere,
                                    and unforgettable experience.
                                </p>

                            </div>

                            {/* SHARE */}

                            <div className="
                border-t
                border-b
                py-10
                flex
                flex-wrap
                justify-between
                gap-8
                my-20
              ">

                                <div className="flex gap-3">

                                    <span className="
                    bg-[#ede7e2]
                    px-4
                    py-2
                  ">
                                        Event Planning
                                    </span>

                                    <span className="
                    bg-[#ede7e2]
                    px-4
                    py-2
                  ">
                                        Luxury Events
                                    </span>

                                </div>

                                <div className="flex gap-5">

                                    <FaFacebookF
                                        className="
      text-lg
      cursor-pointer
      hover:text-[#572649]
      transition
    "
                                    />

                                    <FaXTwitter
                                        className="
      text-lg
      cursor-pointer
      hover:text-[#572649]
      transition
    "
                                    />

                                    <FaInstagram
                                        className="
      text-lg
      cursor-pointer
      hover:text-[#572649]
      transition
    "
                                    />

                                </div>



                            </div>



                            {/* COMMENTS SECTION */}

                           <Comments slug={post.slug || post._id} />

                            {/* COMMENT FORM */}

                            



                        </article>



                        {/* SIDEBAR */}

                        <aside className="
              space-y-10
              lg:sticky
              lg:top-10
              h-fit
            ">

                            {/* SEARCH */}

                            <div className="
                bg-white
                p-8
                shadow-sm
              ">

                                <h3 className="
                  font-serif
                  text-2xl
                  mb-6
                ">
                                    Search
                                </h3>

                                <div className="relative">

                                    <input
                                        placeholder="Search..."
                                        className="
                      w-full
                      border
                      border-gray-200
                      p-4
                      pr-12
                      outline-none
                    "
                                    />

                                    <Search
                                        size={18}
                                        className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                    "
                                    />

                                </div>

                            </div>

                            {/* RECENT POSTS */}

                            <div className="
                bg-white
                p-8
              ">

                                <h3 className="
                  font-serif
                  text-2xl
                  mb-8
                ">
                                    Recent Posts
                                </h3>

                                <div className="space-y-8">

                                    {recentPosts.map((item) => (

                                        <Link
                                            key={item.slug}
                                            href={`/blog/${item.slug}`}
                                            className="
                        flex
                        gap-5
                        group
                      "
                                        >

                                            <div className="
                        relative
                        w-24
                        h-24
                        overflow-hidden
                      ">

                                                <Image
                                                    src={item.image}
                                                    alt=""
                                                    fill
                                                    className="
                            object-cover
                            group-hover:scale-110
                            duration-500
                          "
                                                />

                                            </div>

                                            <div>

                                                <p className="
                          text-sm
                          text-[#777]
                          mb-2
                        ">
                                                    {item.date}
                                                </p>

                                                <h4 className="
                          leading-snug
                          group-hover:text-[#572649]
                          duration-300
                        ">
                                                    {item.title}
                                                </h4>

                                            </div>

                                        </Link>

                                    ))}

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </section>

        </main>

    );
}